import { apiRequest } from "./apiClient";

export const careerService = {
  getAllCareers: () => apiRequest("/career", { auth: false }),
};
