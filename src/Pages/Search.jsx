import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import styles from "./Search.module.css";
import { generateSearchCSV } from "../utils/api";

import SearchHeader from "../Components/Search/SearchHeader";
import LoadingScreen from "../Components/Search/LoadingScreen";
import Resultats from "../Components/Search/Resultats";

import { useSearchContext } from "../Context/SearchContext";
import { useLayoutContext } from "../Context/LayoutContext"; // 🆕

export default function Search() {
  const [searchParams] = useSearchParams();
  const initialTerm = searchParams.get("term") || "";

  const {
    setHasSearched,
    searchResults,
    setSearchResults,
    lastSearchTerm,
    setLastSearchTerm,
  } = useSearchContext();

  const { setLayoutMode } = useLayoutContext(); // 🆕

  const [searchTerm, setSearchTerm] = useState(initialTerm);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const useMockData = true;

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?term=${encodeURIComponent(searchTerm)}`);
    }
  };

  // 🔁 Activa el mode 'search' en entrar a la pàgina
  useEffect(() => {
    setLayoutMode("search");
  }, []);

  useEffect(() => {
    if (!initialTerm && lastSearchTerm && searchResults) {
      setResults(searchResults);
    }
  }, [initialTerm, lastSearchTerm, searchResults]);

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

  return (
    <div className={`${styles.searchPage} ${isLoading ? styles.centeredPage : ""}`}>
      <Helmet>
        <title>Search Results - FeelIt</title>
        <meta name="description" content={`Opinions about ${initialTerm}`} />
      </Helmet>

      {isLoading ? (
        <LoadingScreen progress={progress} />
      ) : (
        <div className={styles.searchContainer}>
          <SearchHeader
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
            initialTerm={initialTerm || lastSearchTerm}
          />

          {error ? (
            <div className={styles.searchError}>
              No results found for <strong>{initialTerm}</strong>.
            </div>
          ) : (
            results && <Resultats results={results} />
          )}
        </div>
      )}
    </div>
  );
}
