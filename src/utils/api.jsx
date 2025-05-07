// src/utils/api.js

const BACKEND_URL = "http://localhost:8000"; // Canvia-ho en producció

/**
 * Envia la keyword al backend per iniciar la generació de resultats (CSV, etc.)
 */
export const generateSearchCSV = async (keyword) => {
  const res = await fetch(`${BACKEND_URL}/api/search?keyword=${encodeURIComponent(keyword)}`);
  if (!res.ok) throw new Error("Error generant CSV");
  return await res.json(); // { message: "...", etc. }
};

/**
 * Obté resultats analitzats del backend (opinions, sentiments, etc.)
 */
export const fetchSearchResults = async (keyword) => {
  const res = await fetch(`${BACKEND_URL}/search/${encodeURIComponent(keyword)}`);
  if (!res.ok) throw new Error("Error obtenint resultats");
  return await res.json(); // JSON amb opinions, sentiments, comentaris...
};
