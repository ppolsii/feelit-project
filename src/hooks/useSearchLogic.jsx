import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams(); // Get search params from URL (e.g., ?term=searchTerm)
  const initialTerm = searchParams.get("term") || localStorage.getItem("lastSearchTerm") || "";
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Context for search state management
  const {
    setHasSearched,
    searchResults,
    setSearchResults,
    lastSearchTerm,
    setLastSearchTerm,
  } = useSearchContext(); //useSearchContext

  // Local state for search logic
  const [searchTerm, setSearchTerm] = useState(initialTerm); //Input value
  const [results, setResults] = useState(null); // Loaded results
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [progress, setProgress] = useState(0); // Visual progress
  const [error, setError] = useState(false); // Error state

  // Redirets to the route /search with the search term
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?term=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Wait and try loading results from the servr
  async function waitForResults(keyword) {
    if (useMockData) {
      // Load mock data from local file
      try {
        // const res = await fetch("/data/mockResults.json");
        const res = await fetch("/data/reddit_praw_Trip_to_Japan_2025-05-23_analyzed.json");
        if (!res.ok) throw new Error("Mock results not found");
        const data = await res.json();
        return data;
      } catch (err) {
        console.error("Error loading mock results:", err);
        throw err;
      }
    } else {
      // Load real data from server
      const encodedKeyword = encodeURIComponent(keyword);
      for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
          const data = await fetchSearchResults(keyword); // Fetch data from server
          return data;
        } catch (err) {
          console.error(`Waiting attempt ${attempt}:`, err);
        }
        await new Promise((resolve) => setTimeout(resolve, DELAY_MS)); // Wait before the next attempt
      }
      throw new Error("Result not available after maximum waiting time");
    }
  }

  // When is loaded, set the layout mode to search
  useEffect(() => {
    setLayoutMode("search");
  }, []);

  // If we had an initial term, we set the search term to the initial term
  useEffect(() => {
  // ✅ NOVA LÒGICA: Si tornes a /search sense terme, mostra els últims resultats
  if (!initialTerm.trim() && searchResults) {
    setResults(searchResults);
    setIsLoading(false);
    return;
  }

  if (!initialTerm.trim()) return;

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

  // 🔁 Tot el que ja tenies: carregar nous resultats
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

      setResults(data);
      setSearchResults(data);
      setLastSearchTerm(initialTerm);

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
