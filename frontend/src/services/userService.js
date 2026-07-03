const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";




async function request(path, method = "GET", body = null) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : null,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || data.error || "Request failed");
  }

  return data;
}

export const userService = {
  // profile (already used)
  getProfile: () => request("/users/profile"),

  updateProfile: (username) =>
    request("/users/profile", "PUT", { username }),

  // ADMIN USERS
  getAllUsers: () => request("/users"),

  deleteUser: (id) => request(`/users/${id}`, "DELETE"),
};