import { apiRequest } from "./apiClient";

export const assessmentService = {
  getRecommendation: (studentProfile) =>
    apiRequest("/assessments/recommendation", {
      method: "POST",
      body: studentProfile,
    }),
  chat: (messages) =>
    apiRequest("/assessments/chat", { method: "POST", body: { messages } }),
  createAssessment: (user_id) =>
    apiRequest("/assessments", { method: "POST", body: { user_id } }),
  submitAnswer: (ass_id, question_id, answer_value, answer_text = null) =>
    apiRequest("/answers", {
      method: "POST",
      body: { ass_id, question_id, answer_value, answer_text },
    }),
  completeAssessment: (ass_id) =>
    apiRequest(`/assessments/${ass_id}/complete`, { method: "PUT" }),
  analyzeAssessment: (assessment_id) =>
    apiRequest("/api/ai/analyze-assessment", {
      method: "POST",
      body: { assessment_id },
    }),
  saveAcademicScores: (ass_id, scores) =>
    apiRequest("/academic-scores", {
      method: "POST",
      body: { ass_id, scores },
    }),
};

export const LIKERT_OPTIONS = [
  { score: 1, label: "Strongly Disagree" },
  { score: 2, label: "Disagree" },
  { score: 3, label: "Neutral" },
  { score: 4, label: "Agree" },
  { score: 5, label: "Strongly Agree" },
];
