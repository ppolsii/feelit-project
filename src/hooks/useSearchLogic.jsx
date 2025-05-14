import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { generateSearchCSV, fetchSearchResults } from "../utils/api";
import { useSearchContext } from "../Context/SearchContext";
import { config } from "../config";

// Configurable wait settings
const MAX_WAIT_MINUTES = 5;
const DELAY_MS = 3000;
const MAX_ATTEMPTS = Math.ceil((MAX_WAIT_MINUTES * 60 * 1000) / DELAY_MS);

// Mock data flag
const { useMockData } = config; // Set to false to use real data - change in config.js

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

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?term=${encodeURIComponent(searchTerm)}`);
    }
  };

  async function waitForResults(keyword) {
    if (useMockData) {
      try {
        const res = await fetch("/data/mockResults.json");
        if (!res.ok) throw new Error("Mock results not found");
        const data = await res.json();
        return data;
      } catch (err) {
        console.error("Error loading mock results:", err);
        throw err;
      }
    } else {
      const encodedKeyword = encodeURIComponent(keyword);
      for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
          const data = await fetchSearchResults(keyword);
          return data;
        } catch (err) {
          console.error(`Waiting attempt ${attempt}:`, err);
        }
        await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
      }
      throw new Error("Result not available after maximum waiting time");
    }
  }

  useEffect(() => {
    setLayoutMode("search");
  }, []);

  useEffect(() => {
    if (!initialTerm.trim()) return;

    // 🔥 Comprovem si tenim resultats guardats
    const savedResults = localStorage.getItem("searchResults");
    const savedTerm = localStorage.getItem("lastSearchTerm");

    if (savedResults && savedTerm === initialTerm) {
      setResults(JSON.parse(savedResults));
      setIsLoading(false);
      return;
    }

    if (searchResults && initialTerm === lastSearchTerm) {
      setResults(searchResults);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(false);
    setProgress(0);
    setResults(null);

    const simulateProgress = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 90));
    }, 30);

    const loadResults = async () => {
      try {
        if (!useMockData) {
          await generateSearchCSV(initialTerm);
        }
        const data = await waitForResults(initialTerm);
        if (!data) throw new Error("Empty result");

        setResults(data);
        setSearchResults(data);
        setLastSearchTerm(initialTerm);

        // 🔥 Guardem també a LocalStorage
        localStorage.setItem("searchResults", JSON.stringify(data));
        localStorage.setItem("lastSearchTerm", initialTerm);

        setProgress(100);
        setHasSearched(true);
      } catch (err) {
        console.error("Error loading data:", err);
        setError(true);
      } finally {
        clearInterval(simulateProgress);
        setIsLoading(false);
      }
    };

    loadResults();
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
