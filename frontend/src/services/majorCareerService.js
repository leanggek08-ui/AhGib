const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getToken() {
  return localStorage.getItem("token");
}

// Reuses the existing /major-career endpoint that AdminMajorCareers.jsx
// already talks to, just exposed as a reusable student-side service.
export const majorCareerService = {
  async getAllMajorCareers() {
    const res = await fetch(`${BASE_URL}/major-career`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) throw new Error("Failed to load major-career mappings");

    return res.json();
  },
};
