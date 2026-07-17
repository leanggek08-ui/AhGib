import { apiRequest } from "./apiClient";

const UNIVERSITY_ENDPOINT = "/api/universities";

export const universityService = {
  getAllUniversities: async () => {
    const response = await apiRequest(UNIVERSITY_ENDPOINT, { auth: false });
    return response.data;
  },
  createUniversity: async (data) => {
    const response = await apiRequest(UNIVERSITY_ENDPOINT, {
      method: "POST",
      body: data,
    });
    return response.data;
  },
  updateUniversity: async (id, data) => {
    const response = await apiRequest(`${UNIVERSITY_ENDPOINT}/${id}`, {
      method: "PUT",
      body: data,
    });
    return response.data;
  },
  deleteUniversity: (id) =>
    apiRequest(`${UNIVERSITY_ENDPOINT}/${id}`, { method: "DELETE" }),
};
