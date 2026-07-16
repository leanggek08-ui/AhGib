const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getToken() {
  return localStorage.getItem("token");
}

async function request(path, body, method = "POST") {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || data.message || "Request failed");
  }

  return data;
}

export const assessmentService = {
  getRecommendation: (studentProfile) =>
    request("/assessments/recommendation", studentProfile),

  chat: (messages) => request("/assessments/chat", { messages }),

  createAssessment: (user_id) => request("/assessments", { user_id }),

  submitAnswer: (ass_id, question_id, answer_value, answer_text = null) =>
    request("/answers", { ass_id, question_id, answer_value, answer_text }),

  completeAssessment: (ass_id) =>
    request(`/assessments/${ass_id}/complete`, null, "PUT"),

  saveAcademicScores: (ass_id, scores) =>
    request("/academic-scores", { ass_id, scores }),
};

export const LIKERT_OPTIONS = [
  { score: 1, label: "Strongly Disagree" },
  { score: 2, label: "Disagree" },
  { score: 3, label: "Neutral" },
  { score: 4, label: "Agree" },
  { score: 5, label: "Strongly Agree" },
];