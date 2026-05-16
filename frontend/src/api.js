const API_BASE = "https://vritti-piny.onrender.com/api/auth";

// Save token in localStorage
export function setToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

console.log("🚀 About to call apiFetch with token:", localStorage.getItem("token"));

export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("token");
  console.log("🚀 apiFetch sending token:", token);

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  console.log("🌐 Fetching:", `https://vritti-piny.onrender.com/api${url}`, headers);

  const res = await fetch(`https://vritti-piny.onrender.com/api${url}`, {
    ...options,
    headers,
    credentials: "include"
  });

  return res;
}


// Clear token
export function clearToken() {
  localStorage.removeItem("token");
}

// Register (Signup)
export async function register(body) {
  return fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// Login

export async function login(credentials) {
  return fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
}


// Get current user
export async function getMe() {
  return fetch(`${API_BASE}/me`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
}