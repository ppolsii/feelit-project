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
  const [searchParams] = useSearchParams(); // Get search params from URL (e.g., ?term=searchTerm)
  const initialTerm = searchParams.get("term") || ""; // Initial search term 
  const navigate = useNavigate();

  // Context for search state management
  const {
    setHasSearched,
    searchResults,
    setSearchResults,
    lastSearchTerm,
    setLastSearchTerm,
  } = useSearchContext();

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
        const res = await fetch("/data/mockResults.json");
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
    if (!initialTerm.trim()) return;

    // Load results if we had them saved in localStorage
    const savedResults = localStorage.getItem("searchResults");
    const savedTerm = localStorage.getItem("lastSearchTerm");

    // If we have results saved and the term is the same as the initial term, load them
    if (savedResults && savedTerm === initialTerm) {
      setResults(JSON.parse(savedResults));
      setIsLoading(false);
      return;
    }

    // If we already hace the results in the context, we reuse them
    if (searchResults && initialTerm === lastSearchTerm) {
      setResults(searchResults);
      setIsLoading(false);
      return;
    }

    // Reset the state before doing a new search
    setIsLoading(true);
    setError(false);
    setProgress(0);
    setResults(null);

    // Simulate progress bar
    const simulateProgress = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 90));
    }, 30);

    // Execution of the search and load results
    const loadResults = async () => {
      try {
        if (!useMockData) {
          await generateSearchCSV(initialTerm); // Send search to the server
        }
        const data = await waitForResults(initialTerm); // Wait for results

        setResults(data);
        setSearchResults(data);
        setLastSearchTerm(initialTerm);

        // Results saved in localStorage
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
