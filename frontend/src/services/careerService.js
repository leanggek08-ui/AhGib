const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getToken() {
  return localStorage.getItem("token");
}

export const careerService = {
  async getAllCareers() {
    const res = await fetch(`${BASE_URL}/careers`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    if (!res.ok) throw new Error("Failed to load careers");

    return res.json();
  }
};