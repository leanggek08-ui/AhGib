import { apiRequest } from "./apiClient";

export const questionService = {
  getAll: () => apiRequest("/questions", { auth: false }),
  getById: (id) => apiRequest(`/questions/${id}`, { auth: false }),
  create: (data) => apiRequest("/questions", { method: "POST", body: data }),
  update: (id, data) =>
    apiRequest(`/questions/${id}`, { method: "PUT", body: data }),
  delete: (id) => apiRequest(`/questions/${id}`, { method: "DELETE" }),
};
