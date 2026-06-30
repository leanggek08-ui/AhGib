const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || data.error || "Request failed");
  }

  return data;
}

const authService = {
  register: (username, email, password) =>
    request("/auth/register", { username, email, password }),

  login: (email, password) =>
    request("/auth/login", { email, password }),

  forgotPassword: (email) =>
    request("/auth/forgot-password", { email }),

  resetPassword: (token, new_password) =>
    request("/auth/reset-password", { token, new_password }),
};

export default authService;