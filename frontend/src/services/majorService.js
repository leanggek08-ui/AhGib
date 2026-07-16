const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getToken() {
  return localStorage.getItem("token");
}

export const majorService = {
  async getAllMajors() {
    const res = await fetch(`${BASE_URL}/major`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    if (!res.ok) throw new Error("Failed to load majors");

    return res.json();
  }
};