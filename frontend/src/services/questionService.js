const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function getToken() {
  return localStorage.getItem("token");
}

async function request(path, method = "GET", body = null) {
  const token = getToken();

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
    throw new Error(data.error || data.message || "Request failed");
  }

  return data;
}

export const questionService = {
  // GET all questions
  getAll: () => request("/questions"),

  // GET one question
  getById: (id) => request(`/questions/${id}`),

  // CREATE question
  create: (data) => request("/questions", "POST", data),

  // UPDATE question
  update: (id, data) =>
    request(`/questions/${id}`, "PUT", data),

  // DELETE question
  delete: (id) =>
    request(`/questions/${id}`, "DELETE"),

  // update
  update: (id, data) =>
  request(`/questions/${id}`, "PUT", data),
};