// src/api.js

const API_BASE = "http://localhost:3000"; // change to your backend URL

export async function fetchLeads() {
  try {
    const res = await fetch(`${API_BASE}/api/leads`);
    if (!res.ok) throw new Error("Failed to fetch leads");
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}
