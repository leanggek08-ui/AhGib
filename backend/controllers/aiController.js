import pool from "../db/db.js";
import { generateCareerRecommendation } from "../services/groqService.js";

const ANSWER_LABELS = {
  1: "Strongly Disagree",
  2: "Disagree",
  3: "Neutral",
  4: "Agree",
  5: "Strongly Agree",
};

function parseStoredReport(value) {
  if (!value) return null;
  try {
    return typeof value === "string" ? JSON.parse(value) : value;
  } catch {
    return null;
  }
}

function constrainRecommendations(analysis, universities, majors) {
  const universityNames = new Set(
    universities.map(({ name }) => name.trim().toLowerCase()),
  );
  const majorNames = new Set(
    majors.map(({ major_name }) => major_name.trim().toLowerCase()),
  );

  return {
    summary: typeof analysis?.summary === "string" ? analysis.summary : "",
    top_careers: Array.isArray(analysis?.top_careers)
      ? analysis.top_careers
      : [],
    recommended_majors: Array.isArray(analysis?.recommended_majors)
      ? analysis.recommended_majors.filter(({ name }) =>
          majorNames.has(String(name || "").trim().toLowerCase()),
        )
      : [],
    recommended_universities: Array.isArray(analysis?.recommended_universities)
      ? analysis.recommended_universities.filter(({ name }) =>
          universityNames.has(String(name || "").trim().toLowerCase()),
        )
      : [],
    skills_to_develop: Array.isArray(analysis?.skills_to_develop)
      ? analysis.skills_to_develop
      : [],
    roadmap: Array.isArray(analysis?.roadmap)
      ? analysis.roadmap
      : analysis?.roadmap
        ? [String(analysis.roadmap)]
        : [],
    notes: typeof analysis?.notes === "string" ? analysis.notes : "",
  };
}

export async function analyzeAssessment(req, res) {
  const assessmentId = Number(req.body?.assessment_id);

  if (!Number.isInteger(assessmentId) || assessmentId <= 0) {
    return res.status(400).json({
      success: false,
      message: "assessment_id is required and must be a positive integer",
    });
  }

  console.log(`[AI Analysis] Received assessment_id=${assessmentId}`);

  try {
    const assessmentResult = await pool.query(
      `SELECT ass_id, user_id, status, time_create
       FROM public.assessments
       WHERE ass_id = $1`,
      [assessmentId],
    );

    if (assessmentResult.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      });
    }

    const assessment = assessmentResult.rows[0];
    const isAdmin = [1, 3].includes(Number(req.user?.role_id));
    if (!isAdmin && Number(assessment.user_id) !== Number(req.user?.user_id)) {
      return res.status(403).json({
        success: false,
        message: "You cannot analyze another user's assessment",
      });
    }

    const existingReportResult = await pool.query(
      `SELECT report_id, date_generate, career_analysis
       FROM public.ai_report
       WHERE ass_id = $1
       ORDER BY report_id DESC
       LIMIT 1`,
      [assessmentId],
    );
    const existingReport = existingReportResult.rows[0];
    const cachedAnalysis = parseStoredReport(existingReport?.career_analysis);

    if (assessment.status === "completed" && cachedAnalysis) {
      console.log(`[AI Analysis] Returning cached report for assessment_id=${assessmentId}`);
      return res.json({
        success: true,
        message: "Career analysis already exists",
        data: cachedAnalysis,
        report_id: existingReport.report_id,
      });
    }

    const [
      answersResult,
      academicResult,
      universitiesResult,
      majorsResult,
      questionCountResult,
    ] =
      await Promise.all([
        pool.query(
          `SELECT ans.answer_id, ans.question_id, ans.answer_text,
                  ans.answer_value, q.question_text, q.question_type, q.subject
           FROM public.answer ans
           JOIN public.questions q ON q.question_id = ans.question_id
           WHERE ans.ass_id = $1
           ORDER BY q.question_id ASC`,
          [assessmentId],
        ),
        pool.query(
          `SELECT subject, score_value
           FROM public.academic_score
           WHERE ass_id = $1
           ORDER BY subject ASC`,
          [assessmentId],
        ),
        pool.query(
          `SELECT university_id, name, location, website
           FROM public.universities
           ORDER BY university_id ASC`,
        ),
        pool.query(
          `SELECT major_id, major_name, field_of_study
           FROM public.major
           ORDER BY major_id ASC`,
        ),
        pool.query(`SELECT COUNT(*)::int AS count FROM public.questions`),
      ]);

    console.log(`[AI Analysis] Answers found: ${answersResult.rowCount}`);
    console.log(`[AI Analysis] Academic scores found: ${academicResult.rowCount}`);

    if (answersResult.rowCount === 0) {
      return res.status(400).json({
        success: false,
        message: "No answers found for this assessment",
      });
    }

    const expectedAnswerCount = questionCountResult.rows[0].count;
    if (answersResult.rowCount < expectedAnswerCount) {
      return res.status(400).json({
        success: false,
        message: `Assessment is incomplete: found ${answersResult.rowCount} of ${expectedAnswerCount} answers`,
      });
    }

    const summaryScores = {};
    const responses = answersResult.rows.map((row) => {
      const category = row.subject || row.question_type || "general";
      const score = Number(row.answer_value ?? 0);
      summaryScores[category] = (summaryScores[category] || 0) + score;
      return {
        question_id: row.question_id,
        question: row.question_text,
        question_type: row.question_type,
        category,
        answer: row.answer_text || ANSWER_LABELS[score] || String(score),
        score,
      };
    });

    const studentProfile = {
      assessment_id: assessment.ass_id,
      student_id: assessment.user_id,
      status: assessment.status,
      created_at: assessment.time_create,
      academic_scores: academicResult.rows.map((row) => ({
        subject: row.subject,
        score: Number(row.score_value),
      })),
      responses,
      summary_scores: summaryScores,
      available_universities: universitiesResult.rows,
      available_majors: majorsResult.rows,
    };

    console.log(`[AI Analysis] Groq request started for assessment_id=${assessmentId}`);
    const generated = await generateCareerRecommendation(studentProfile);
    console.log(`[AI Analysis] Groq response received for assessment_id=${assessmentId}`);

    const analysis = constrainRecommendations(
      generated,
      universitiesResult.rows,
      majorsResult.rows,
    );

    const inserted = await pool.query(
      `INSERT INTO public.ai_report (ass_id, date_generate, career_analysis)
       VALUES ($1, NOW(), $2)
       RETURNING report_id, date_generate`,
      [assessmentId, JSON.stringify(analysis)],
    );

    return res.json({
      success: true,
      message: "Career analysis generated successfully",
      data: analysis,
      report_id: inserted.rows[0].report_id,
    });
  } catch (error) {
    console.error(`[AI Analysis] assessment_id=${assessmentId} failed:`, error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Assessment analysis failed",
    });
  }
}
