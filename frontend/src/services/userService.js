import { apiRequest } from "./apiClient";

export const userService = {
  getProfile: () => apiRequest("/users/profile"),
  updateProfile: (username) =>
    apiRequest("/users/profile", { method: "PUT", body: { username } }),
  getAllUsers: () => apiRequest("/users"),
  deleteUser: (id) => apiRequest(`/users/${id}`, { method: "DELETE" }),
  updateUser: (id, data) =>
    apiRequest(`/users/${id}`, { method: "PUT", body: data }),
};
