import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Search() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialTerm = params.get("term") || "";

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!initialTerm.trim()) return;

    setIsLoading(true);
    setError(false);
    setProgress(0);

    // 🔵 1. Crida al backend només per crear el CSV
    fetch(`http://localhost:8000/api/search?keyword=${encodeURIComponent(initialTerm)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la creació de CSV");
        return res.json();
      })
      .then((data) => {
        console.log("✅ CSV generat:", data.message);
      })
      .catch((err) => {
        console.error("❌ Error generant CSV:", err);
      });

    // 🔵 2. Mentrestant, seguim carregant les dades mock per mostrar
    const simulateProgress = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;
        return next >= 90 ? 90 : next;
      });
    }, 30);

    const timeout = setTimeout(() => {
      fetch("/data/mockResults.json")
        .then((res) => {
          if (!res.ok) throw new Error("Error carregant mockResults");
          return res.json();
        })
        .then((data) => {
          setProgress(100);
          setResults(data);
        })
        .catch((err) => {
          console.error("Error carregant mockResults:", err);
          setError(true);
        })
        .finally(() => {
          clearInterval(simulateProgress);
          setIsLoading(false);
        });
    }, 1500);

    return () => {
      clearInterval(simulateProgress);
      clearTimeout(timeout);
    };
  }, [initialTerm]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      {isLoading && (
        <div>
          <p className="text-lg font-semibold mb-4">Buscant...</p>
          <div className="w-64 h-4 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="text-red-600 text-lg font-semibold mt-4">
          ❌ Error carregant resultats.
        </div>
      )}

      {results && (
        <div className="w-full mt-8">
          {/* Aquí mostres els resultats mock com sempre */}
          {/* Per exemple: */}
          {/* <Resultats results={results} /> */}
        </div>
      )}
    </div>
  );
}

export default Search;
