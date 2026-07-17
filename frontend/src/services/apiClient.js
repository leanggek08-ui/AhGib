export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

export async function apiRequest(path, options = {}) {
  const { auth = true, body, headers, ...fetchOptions } = options;
  const token = localStorage.getItem("token");
  const requestHeaders = { ...headers };

  if (body !== undefined) requestHeaders["Content-Type"] = "application/json";
  if (auth && token) requestHeaders.Authorization = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...fetchOptions,
      headers: requestHeaders,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new Error(
      `Cannot reach the backend at ${API_BASE_URL}. Make sure it is running.`,
    );
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    throw new Error(data.message || data.error || `Request failed (${response.status})`);
  }

  return data;
}
