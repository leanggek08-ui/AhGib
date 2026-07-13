const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getToken() {
  return localStorage.getItem("token");
}

export const universityService = {
  async getAllUniversities() {
    const res = await fetch(`${BASE_URL}/universities`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    if (!res.ok) throw new Error("Failed to load universities");

    return res.json();
  },

  async createUniversity(data) {
    const res = await fetch(`${BASE_URL}/universities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Failed to create university");

    return res.json();
  },

  async updateUniversity(id, data) {
    const res = await fetch(`${BASE_URL}/universities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Failed to update university");

    return res.json();
  },

  async deleteUniversity(id) {
    const res = await fetch(`${BASE_URL}/universities/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    if (!res.ok) throw new Error("Failed to delete university");

    return res.json();
  }
};