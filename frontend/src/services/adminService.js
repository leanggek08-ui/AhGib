import { apiRequest } from "./apiClient";

export const adminService = {
  getDashboard: () => apiRequest("/admin"),
};
