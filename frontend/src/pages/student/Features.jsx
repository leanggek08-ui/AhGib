import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StudentLayout from "../../layouts/StudentLayout";
import ErrorBox from "../../components/ErrorBox";
import { universityService } from "../../services/universityService";
import { majorService } from "../../services/majorService";
import { uniMajorService } from "../../services/uniMajorService";
import { careerService } from "../../services/careerService";
import { majorCareerService } from "../../services/majorCareerService";
import { questionService } from "../../services/questionService";
import {
  assessmentService,
  LIKERT_OPTIONS,
} from "../../services/assessmentService";
import { styles } from "../../styles/studentFeaturesStyles";

const errorBoxStyle = { errorBox: { color: "#ff6b6b", marginBottom: "16px" } };

export default function Features() {
  const location = useLocation();
  const initialMode =
    location.state?.mode === "assessment" ? "assessment" : "search";
  const [mode, setMode] = useState(initialMode);

  return (
    <StudentLayout>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 100% 50%; }
          100% { background-position: 0 50%; }
        }
      `}</style>

      <div style={styles.header}>
        <span style={styles.eyebrowPill}>
          <span style={styles.eyebrowText}>✨ Platform Features</span>
        </span>
        <h1 style={styles.pageTitle}>
          Explore universities or start your
          <span style={styles.pageTitleAccent}>AI career assessment</span>
        </h1>
      </div>

      <div style={styles.toggleWrap}>
        <button
          style={{
            ...styles.toggleBtn,
            ...(mode === "search" ? styles.toggleBtnActive : {}),
          }}
          onClick={() => setMode("search")}
        >
          🎓 University Search
        </button>
        <button
          style={{
            ...styles.toggleBtn,
            ...(mode === "assessment" ? styles.toggleBtnActive : {}),
          }}
          onClick={() => setMode("assessment")}
        >
          💬 AI Career Assessment
        </button>
      </div>

      {mode === "search" ? <UniversitySearchPanel /> : <AssessmentPanel />}
    </StudentLayout>
  );
}

/* ============================================================
   University Search panel
   Merges the old Universities.jsx + Majors.jsx + Careers.jsx
   pages into one searchable/filterable grid.
   ============================================================ */

function UniversitySearchPanel() {
  const [universities, setUniversities] = useState([]);
  const [majors, setMajors] = useState([]);
  const [uniMajors, setUniMajors] = useState([]);
  const [careers, setCareers] = useState([]);
  const [majorCareers, setMajorCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [majorFilter, setMajorFilter] = useState("all");
  const [careerFilter, setCareerFilter] = useState("all");

  // Only true once the backend actually starts returning a `type` field on
  // universities (Public/Private) — see the note in the filter row below.
  const hasTypeField = universities.some((u) => u.type);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    try {
      setLoading(true);
      const [u, m, um, c, mc] = await Promise.all([
        universityService.getAllUniversities(),
        majorService.getAllMajors(),
        uniMajorService.getAllUniMajors(),
        careerService.getAllCareers(),
        majorCareerService.getAllMajorCareers(),
      ]);
      setUniversities(u);
      setMajors(m);
      setUniMajors(um);
      setCareers(c);
      setMajorCareers(mc);
    } catch (err) {
      setError(err.message || "Failed to load university data.");
    } finally {
      setLoading(false);
    }
  }

  function majorIdsForUniversity(universityId) {
    return uniMajors
      .filter((um) => um.university_id === universityId)
      .map((um) => um.major_id);
  }

  function careerIdsForMajor(majorId) {
    return majorCareers
      .filter((mc) => mc.major_id === majorId)
      .map((mc) => mc.careers_id);
  }

  function majorName(majorId) {
    return majors.find((m) => m.major_id === majorId)?.major_name || "Major";
  }

  const filtered = universities.filter((u) => {
    const text = search.toLowerCase();
    const matchesSearch =
      !text ||
      u.name.toLowerCase().includes(text) ||
      (u.location || "").toLowerCase().includes(text);

    const uniMajorIds = majorIdsForUniversity(u.university_id);
    const matchesType = typeFilter === "all" || u.type === typeFilter;
    const matchesMajor =
      majorFilter === "all" || uniMajorIds.includes(majorFilter);
    const matchesCareer =
      careerFilter === "all" ||
      uniMajorIds.some((mid) => careerIdsForMajor(mid).includes(careerFilter));

    return matchesSearch && matchesType && matchesMajor && matchesCareer;
  });

  return (
    <>
      <div style={styles.searchHero}>
        <div style={styles.searchHeroTitle}>Find Your University</div>
        <div style={styles.searchHeroSubtitle}>
          Search by name or location to discover your ideal institution
        </div>
        <div style={styles.searchInputWrap}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            style={styles.searchInput}
            placeholder="Search universities or locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div style={styles.filterRow}>
        <span style={styles.filterIcon}>▽</span>

        {/* Type only renders once your universities actually carry a `type`
            field (Public/Private) — that column doesn't exist in the schema
            yet, so this stays hidden rather than showing a filter that can
            never do anything. */}
        {hasTypeField && (
          <>
            <span style={styles.filterLabel}>Type:</span>
            <button
              style={{
                ...styles.chip,
                ...(typeFilter === "all" ? styles.chipActiveSolid : {}),
              }}
              onClick={() => setTypeFilter("all")}
            >
              All
            </button>
            <button
              style={{
                ...styles.chip,
                ...(typeFilter === "Public" ? styles.chipActiveSolid : {}),
              }}
              onClick={() => setTypeFilter("Public")}
            >
              Public
            </button>
            <button
              style={{
                ...styles.chip,
                ...(typeFilter === "Private" ? styles.chipActiveSolid : {}),
              }}
              onClick={() => setTypeFilter("Private")}
            >
              Private
            </button>
            <span style={styles.filterDivider} />
          </>
        )}

        <span style={styles.filterLabel}>Major:</span>
        <button
          style={{
            ...styles.chip,
            ...(majorFilter === "all" ? styles.chipActiveSoft : {}),
          }}
          onClick={() => setMajorFilter("all")}
        >
          All
        </button>
        {majors.map((m) => (
          <button
            key={m.major_id}
            style={{
              ...styles.chip,
              ...(majorFilter === m.major_id ? styles.chipActiveSoft : {}),
            }}
            onClick={() => setMajorFilter(m.major_id)}
          >
            {m.major_name}
          </button>
        ))}

        <span style={styles.filterDivider} />

        <span style={styles.filterLabel}>Career:</span>
        <button
          style={{
            ...styles.chip,
            ...(careerFilter === "all" ? styles.chipActiveSoft : {}),
          }}
          onClick={() => setCareerFilter("all")}
        >
          All
        </button>
        {careers.map((c) => (
          <button
            key={c.careers_id}
            style={{
              ...styles.chip,
              ...(careerFilter === c.careers_id ? styles.chipActiveSoft : {}),
            }}
            onClick={() => setCareerFilter(c.careers_id)}
          >
            {c.careers_name}
          </button>
        ))}
      </div>

      <span style={styles.countBadge}>
        <span style={styles.countNum}>{filtered.length}</span> universit
        {filtered.length !== 1 ? "ies" : "y"} found
      </span>

      <ErrorBox message={error} styles={errorBoxStyle} />

      {loading ? (
        <div style={styles.grid}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={styles.skeletonCard} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>🏛️</div>
          <p>No universities match your filters.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filtered.map((u) => {
            const uniMajorIds = majorIdsForUniversity(u.university_id);
            return (
              <div key={u.university_id} style={styles.card}>
                <div style={styles.cardTop}>
                  <div style={styles.cardIcon}>🎓</div>
                  <div>
                    <div style={styles.cardName}>{u.name}</div>
                    <div style={styles.cardMeta}>
                      📍 {u.location || "Location not listed"}
                    </div>
                  </div>
                </div>

                <div style={styles.cardDivider} />

                {uniMajorIds.length === 0 ? (
                  <span style={styles.cardMeta}>No majors listed yet</span>
                ) : (
                  <div style={styles.tagRow}>
                    {uniMajorIds.slice(0, 5).map((mid) => (
                      <span key={mid} style={styles.tag}>
                        {majorName(mid)}
                      </span>
                    ))}
                  </div>
                )}

                {u.website && (
                  <div style={{ marginTop: "12px" }}>
                    <a
                      href={u.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ ...styles.matchReason, color: "#5313c0" }}
                    >
                      🔗 Visit website
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

/* ============================================================
   AI Career Assessment panel
   New flow: intro -> quiz (Likert 1-5 per question) -> submit ->
   AI-generated report. See services/assessmentService.js for the
   proposed backend contract this expects.
   ============================================================ */

function AssessmentPanel() {
  const [step, setStep] = useState("intro");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  async function startAssessment() {
    try {
      setStep("loading-questions");
      const data = await questionService.getAll();
      if (!data || data.length === 0) {
        throw new Error("No assessment questions are available yet.");
      }
      setQuestions(data);
      setCurrent(0);
      setAnswers({});
      setStep("quiz");
    } catch (err) {
      setError(err.message || "Failed to load assessment questions.");
      setStep("error");
    }
  }

  function selectAnswer(score) {
    setAnswers((prev) => ({
      ...prev,
      [questions[current].question_id]: score,
    }));
  }

  function goNext() {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      submitAnswers();
    }
  }

  function goBack() {
    if (current > 0) setCurrent(current - 1);
  }

  async function submitAnswers() {
    try {
      setStep("submitting");
      const payload = Object.entries(answers).map(([question_id, score]) => ({
        question_id: Number(question_id),
        score,
      }));
      const result = await assessmentService.submitAssessment(payload);
      setReport(result);
      setStep("report");
    } catch (err) {
      setError(err.message || "Failed to generate your career report.");
      setStep("error");
    }
  }

  function retake() {
    setReport(null);
    setError("");
    setStep("intro");
  }

  if (step === "intro") {
    return (
      <div style={styles.assessmentCard}>
        <div style={styles.assessmentIntroIcon}>💬</div>
        <div style={styles.assessmentTitle}>AI Career Assessment</div>
        <p style={styles.assessmentText}>
          Answer a short set of questions about how you think, work, and
          learn. Our AI will analyze your responses and recommend the majors
          and careers that fit you best.
        </p>
        <button style={styles.startBtn} onClick={startAssessment}>
          ✨ Start Assessment
        </button>
      </div>
    );
  }

  if (step === "loading-questions" || step === "submitting") {
    return (
      <div style={styles.assessmentCard}>
        <div style={styles.assessmentIntroIcon}>⏳</div>
        <div style={styles.assessmentTitle}>
          {step === "submitting"
            ? "Analyzing your answers..."
            : "Loading questions..."}
        </div>
        <p style={styles.assessmentText}>
          {step === "submitting"
            ? "Our AI is generating your personalized career report. This can take a few seconds."
            : "Just a moment."}
        </p>
      </div>
    );
  }

  if (step === "error") {
    return (
      <div style={styles.assessmentCard}>
        <ErrorBox message={error} styles={errorBoxStyle} />
        <button style={styles.startBtn} onClick={startAssessment}>
          Try Again
        </button>
      </div>
    );
  }

  if (step === "quiz") {
    const q = questions[current];
    const progress = ((current + 1) / questions.length) * 100;
    const answered = answers[q.question_id] !== undefined;

    return (
      <div style={styles.assessmentCard}>
        <span style={styles.progressLabel}>
          Question {current + 1} of {questions.length}
        </span>
        <div style={styles.progressBarTrack}>
          <div style={{ ...styles.progressBarFill, width: `${progress}%` }} />
        </div>

        <div style={styles.questionText}>{q.question_text}</div>

        <div style={styles.optionList}>
          {LIKERT_OPTIONS.map((opt) => (
            <button
              key={opt.score}
              style={{
                ...styles.optionBtn,
                ...(answers[q.question_id] === opt.score
                  ? styles.optionBtnActive
                  : {}),
              }}
              onClick={() => selectAnswer(opt.score)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div style={styles.navRow}>
          <button
            style={{
              ...styles.navBtnSecondary,
              ...(current === 0 ? styles.navBtnDisabled : {}),
            }}
            onClick={goBack}
            disabled={current === 0}
          >
            Back
          </button>
          <button
            style={{
              ...styles.navBtnPrimary,
              ...(!answered ? styles.navBtnDisabled : {}),
            }}
            onClick={goNext}
            disabled={!answered}
          >
            {current === questions.length - 1 ? "See My Results" : "Next"}
          </button>
        </div>
      </div>
    );
  }

  if (step === "report" && report) {
    return (
      <div style={styles.assessmentCard}>
        <div style={styles.assessmentIntroIcon}>🎯</div>
        <div style={styles.assessmentTitle}>Your Career Report</div>

        {report.summary_text && (
          <div style={styles.reportSummary}>{report.summary_text}</div>
        )}

        {report.recommended_careers?.length > 0 && (
          <>
            <div style={styles.reportSectionTitle}>Recommended Careers</div>
            {report.recommended_careers.map((c) => (
              <div key={c.careers_id} style={styles.matchCard}>
                <div>
                  <div style={styles.matchName}>{c.careers_name}</div>
                  {c.reason && (
                    <div style={styles.matchReason}>{c.reason}</div>
                  )}
                </div>
                <div style={styles.matchPercent}>{c.match_percent}%</div>
              </div>
            ))}
          </>
        )}

        {report.recommended_majors?.length > 0 && (
          <>
            <div style={{ ...styles.reportSectionTitle, marginTop: "20px" }}>
              Recommended Majors
            </div>
            {report.recommended_majors.map((m) => (
              <div key={m.major_id} style={styles.matchCard}>
                <div style={styles.matchName}>{m.major_name}</div>
                <div style={styles.matchPercent}>{m.match_percent}%</div>
              </div>
            ))}
          </>
        )}

        <button style={styles.retakeBtn} onClick={retake}>
          Retake Assessment
        </button>
      </div>
    );
  }

  return null;
}
