import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import styles from "./Search.module.css";
import { generateSearchCSV } from "../utils/api";

// Components
import SearchHeader from "../Components/Search/SearchHeader";
import LoadingScreen from "../Components/Search/LoadingScreen";
import Resultats from "../Components/Search/Resultats";

export default function Search() {
  // Get the search term from the URL (?term=...)
  const [searchParams] = useSearchParams();
  const initialTerm = searchParams.get("term") || "";

  // State to control the input field value
  const [searchTerm, setSearchTerm] = useState(initialTerm);

  // Store the results from the backend
  const [results, setResults] = useState(null);

  // Control loading state
  const [isLoading, setIsLoading] = useState(false);

  // Track progress percentage
  const [progress, setProgress] = useState(0);

  // Track if an error occurred (e.g. no results found)
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  // Use mock data or real backend
  const useMockData = true;

  // Triggered when the user submits a search
  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Update the URL with the new term
      navigate(`/search?term=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Run this every time the search term from the URL changes
  useEffect(() => {
    if (!initialTerm.trim()) return;

    // Reset all states
    setIsLoading(true);
    setError(false);
    setProgress(0);
    setResults(null);

    // Notify backend to start processing the search
    generateSearchCSV(initialTerm)
      .then((data) => console.log("Backend responded:", data.message))
      .catch((err) => console.error("Backend error:", err));

    // Simulate loading progress (visual feedback)
    const simulateProgress = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 90));
    }, 30);

    // Load the results (mock or real API)
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
          // Check if the data has useful content
          const hasContent =
            data &&
            (
              (data.sentiments && Object.values(data.sentiments).some(n => n > 0)) ||
              (data.opinions?.positives?.length > 0 || data.opinions?.negatives?.length > 0) ||
              (data.comentaris?.length > 0)
            );

          if (!hasContent) throw new Error("Empty result");

          // Save the results and finish progress
          setResults(data);
          setProgress(100);
        })
        .catch((err) => {
          console.error("Error loading data:", err);
          setError(true);
        })
        .finally(() => {
          // Cleanup loading
          clearInterval(simulateProgress);
          setIsLoading(false);
        });
    }, 1500);

    // Clean up when component unmounts or term changes
    return () => {
      clearInterval(simulateProgress);
      clearTimeout(timeout);
    };
  }, [initialTerm]);

  return (
    <div className={styles.searchPage}>
      {/* Set page title and meta info */}
      <Helmet>
        <title>Search Results - FeelIt</title>
        <meta name="description" content={`Opinions about ${initialTerm}`} />
      </Helmet>

      {/* Show loading screen while waiting */}
      {isLoading ? (
        <LoadingScreen progress={progress} />
      ) : (
        <div className={styles.searchContainer}>
          {/* Header with search bar and title */}
          <SearchHeader
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
            initialTerm={initialTerm}
          />

          {/* Error message if no results found */}
          {error ? (
            <div className={styles.searchError}>
              No results found for <strong>{initialTerm}</strong>.
            </div>
          ) : (
            // Show result components
            results && <Resultats results={results} />
          )}
        </div>
      )}
    </div>
  );
}
