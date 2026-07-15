const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getToken() {
  return localStorage.getItem("token");
}

async function request(path, method = "GET", body = null) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : null,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || data.message || "Request failed");
  }

  return data;
}

/**
 * PROPOSED BACKEND CONTRACT (not built yet — for the Node/Express + OpenAI side)
 *
 * POST /assessment/submit
 *   body:  { answers: [{ question_id: number, score: number (1-5) }] }
 *   returns: {
 *     report_id: number,
 *     summary_text: string,               // AI-generated overview paragraph
 *     recommended_careers: [
 *       { careers_id, careers_name, match_percent, reason }
 *     ],
 *     recommended_majors: [
 *       { major_id, major_name, match_percent }
 *     ],
 *     generated_at: string (ISO date)
 *   }
 *
 * GET /assessment/report/latest
 *   returns the same shape as above for the student's most recent submission,
 *   or 404 if they haven't completed an assessment yet.
 */
export const assessmentService = {
  submitAssessment: (answers) =>
    request("/assessment/submit", "POST", { answers }),

  getLatestReport: () => request("/assessment/report/latest"),
};

// Every question is treated as a 1–5 Likert-style item (Strongly Disagree →
// Strongly Agree), since question_type/subject don't carry their own option
// text. Swap this out if a question ever needs custom option labels.
export const LIKERT_OPTIONS = [
  { score: 1, label: "Strongly Disagree" },
  { score: 2, label: "Disagree" },
  { score: 3, label: "Neutral" },
  { score: 4, label: "Agree" },
  { score: 5, label: "Strongly Agree" },
];
