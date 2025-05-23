// src/utils/api.js

const BACKEND_URL = "http://localhost:8000"; // May get changed in production

/**
 * Sends the keyword to the backend to start generating results (CSV, etc.)
 */
export const generateSearchCSV = async (keyword) => {
  const res = await fetch(`${BACKEND_URL}/api/search?keyword=${encodeURIComponent(keyword)}`);
  if (!res.ok) throw new Error("Error generant CSV");
  return await res.json(); // { message: "...", etc. }
};

/**
 * Gets analyzed results from the backend (opinions, sentiments, etc.)
 */
export const fetchSearchResults = async (keyword) => {
  const res = await fetch(`${BACKEND_URL}/search/${encodeURIComponent(keyword)}`);
  if (!res.ok) throw new Error("Error obtenint resultats");
  return await res.json(); // JSON with results
};
