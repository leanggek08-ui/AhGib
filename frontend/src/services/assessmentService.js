const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getToken() {
  return localStorage.getItem("token");
}

async function request(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || data.message || "Request failed");
  }

  return data;
}

/**
 * Real backend contract (routes/assessment.js + services/groqService.js):
 *
 * POST /assessments/recommendation
 *   body: studentProfile (plain object — whatever shape you want to send;
 *         it gets JSON.stringify'd straight into the AI prompt)
 *   returns: {
 *     message: string,
 *     data: {
 *       summary: string,
 *       top_careers: [{ name, why_it_fits, future_opportunities }],
 *       recommended_majors: [{ name, reason }],
 *       recommended_universities: [{ name, program, reason }],
 *       skills_to_develop: string[],
 *       roadmap: string,
 *       notes: string
 *     }
 *   }
 *
 * POST /assessments/chat
 *   body: { messages: [{ role: "user"|"assistant", content: string }] }
 *   returns: { message: string, reply: string }
 */
export const assessmentService = {
  getRecommendation: (studentProfile) =>
    request("/assessments/recommendation", studentProfile),

  chat: (messages) => request("/assessments/chat", { messages }),
};

// Every quiz question is treated as a 1–5 Likert-style item, since your
// question_type/subject fields don't carry their own option text.
export const LIKERT_OPTIONS = [
  { score: 1, label: "Strongly Disagree" },
  { score: 2, label: "Disagree" },
  { score: 3, label: "Neutral" },
  { score: 4, label: "Agree" },
  { score: 5, label: "Strongly Agree" },
];
