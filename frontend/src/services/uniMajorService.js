const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getToken() {
  return localStorage.getItem("token");
}

export const uniMajorService = {
  async getAllUniMajors() {
    const res = await fetch(`${BASE_URL}/uni-major`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    if (!res.ok) throw new Error("Failed to load university-major assignments");

    return res.json();
  }
};