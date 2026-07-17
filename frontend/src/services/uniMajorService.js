import { apiRequest } from "./apiClient";

export const uniMajorService = {
  getAllUniMajors: () => apiRequest("/uni-major", { auth: false }),
};
