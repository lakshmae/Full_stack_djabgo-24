// src/services/api/auth.js
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const login = async (credentials) => {
  const response = await fetch(`${API_BASE}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Login failed");
  return data;
};

export const logout = async () => {
  // Optional: add a /api/logout/ endpoint in Django
  // For now, just clear frontend state
};