import { apiRequest } from "./apiClient";

export const majorService = {
  getAllMajors: () => apiRequest("/major", { auth: false }),
};
