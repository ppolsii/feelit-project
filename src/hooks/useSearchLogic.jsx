// src/hooks/useSearchLogic.js

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { generateSearchCSV } from "../utils/api";
import { useSearchContext } from "../Context/SearchContext";

/**
 * Encapsulates the full search logic: term management, loading, results, and error.
 */
export function useSearchLogic(setLayoutMode) {
  const [searchParams] = useSearchParams();
  const initialTerm = searchParams.get("term") || "";
  const navigate = useNavigate();

  const {
    setHasSearched,
    searchResults,
    setSearchResults,
    lastSearchTerm,
    setLastSearchTerm,
  } = useSearchContext();

  const [searchTerm, setSearchTerm] = useState(initialTerm);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);

  const useMockData = true;

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?term=${encodeURIComponent(searchTerm)}`);
    }
  };

  // When search page loads, set layout mode to 'search'
  useEffect(() => {
    setLayoutMode("search");
  }, []);

  // Restore last search if no new term provided
  useEffect(() => {
    if (!initialTerm && lastSearchTerm && searchResults) {
      setResults(searchResults);
    }
  }, [initialTerm, lastSearchTerm, searchResults]);

  // Trigger new search or reuse existing results
  useEffect(() => {
    if (!initialTerm.trim()) return;

    if (searchResults && initialTerm === lastSearchTerm) {
      setResults(searchResults);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(false);
    setProgress(0);
    setResults(null);

    generateSearchCSV(initialTerm)
      .then((data) => console.log("Backend responded:", data.message))
      .catch((err) => console.error("Backend error:", err));

    const simulateProgress = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 90));
    }, 30);

    const timeout = setTimeout(() => {
      const url = useMockData
        ? "/data/mockResults.json"
        : `/api/search?query=${encodeURIComponent(initialTerm)}`;

      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error("Result not found");
          return res.json();
        })
        .then((data) => {
          const hasContent =
            data &&
            (
              (data.sentiments && Object.values(data.sentiments).some(n => n > 0)) ||
              (data.opinions?.positives?.length > 0 || data.opinions?.negatives?.length > 0) ||
              (data.comentaris?.length > 0)
            );

          if (!hasContent) throw new Error("Empty result");

          setResults(data);
          setSearchResults(data);
          setLastSearchTerm(initialTerm);
          setProgress(100);
          setHasSearched(true);
        })
        .catch((err) => {
          console.error("Error loading data:", err);
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

  return {
    searchTerm,
    setSearchTerm,
    handleSearch,
    results,
    isLoading,
    progress,
    error,
    initialTerm,
    lastSearchTerm,
  };
}
