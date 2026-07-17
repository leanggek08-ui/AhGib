import { apiRequest } from "./apiClient";

const authService = {
  register: (username, email, password) =>
    apiRequest("/auth/register", {
      method: "POST",
      auth: false,
      body: { username, email, password },
    }),
  login: (email, password) =>
    apiRequest("/auth/login", {
      method: "POST",
      auth: false,
      body: { email, password },
    }),
  forgotPassword: (email) =>
    apiRequest("/auth/forgot-password", {
      method: "POST",
      auth: false,
      body: { email },
    }),
  resetPassword: (token, new_password) =>
    apiRequest("/auth/reset-password", {
      method: "POST",
      auth: false,
      body: { token, new_password },
    }),
};

export default authService;
