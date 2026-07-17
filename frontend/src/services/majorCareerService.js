import { apiRequest } from "./apiClient";

export const majorCareerService = {
  getAllMajorCareers: () => apiRequest("/major-career", { auth: false }),
};
