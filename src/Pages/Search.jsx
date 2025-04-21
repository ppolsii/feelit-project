// Search.jsx - This page shows results after the user performs a search

import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // Get URL params and navigate
import { Helmet } from "react-helmet"; // Set page title
import { FaRobot, FaReddit } from "react-icons/fa"; // Icons for loading animation

import SearchBar from "../Components/Search/SearchBar"; // Search input component
import Resultats from "../Components/Search/Resultats"; // Results display component

export default function Search() {
  const [searchParams] = useSearchParams(); // Get ?term= from URL
  const initialTerm = searchParams.get("term") || "";

  // States
  const [searchTerm, setSearchTerm] = useState(initialTerm); // Current input
  const [results, setResults] = useState(null); // Fetched result data
  const [isLoading, setIsLoading] = useState(false); // Loading status
  const [error, setError] = useState(false); // Error status
  const [progress, setProgress] = useState(0); // Fake progress bar state

  const navigate = useNavigate();
  const useMockData = true; // ← change to true when backend is available

  // When the user clicks the search button
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search?term=${encodeURIComponent(searchTerm)}`);
    }
  };

  // When the search term in the URL changes
  useEffect(() => {
    if (!initialTerm.trim()) return;

    setIsLoading(true);
    setError(false);
    setProgress(0);
    setResults(null);

    const slug = initialTerm.toLowerCase().replace(/\s+/g, "_");

    const simulateProgress = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;
        return next >= 90 ? 90 : next;
      });
    }, 30);

    const timeout = setTimeout(() => {
      const url = useMockData
        ? "/data/mockResults.json" // o `/data/${slug}.json` si fas servir noms dinàmics
        : `/api/search?query=${encodeURIComponent(initialTerm)}`;

      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error("File not found");
          return res.json();
        })
        .then((data) => {
          const hasContent =
            data &&
            (
              (data.sentiments && Object.values(data.sentiments).some(n => n > 0)) ||
              (data.opinions && (
                data.opinions.positives?.length > 0 ||
                data.opinions.negatives?.length > 0
              )) ||
              (data.comentaris?.length > 0)
            );

          if (!hasContent) throw new Error("Empty file");

          setResults(data);
          setProgress(100);
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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white text-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-12 space-y-6">
        <Helmet>
          <title>Search Results - FeelIt</title>
          <meta name="description" content={`Reddit opinions about ${initialTerm}`} />
        </Helmet>

        <div className="p-6 max-w-3xl mx-auto space-y-4">
          {/* Search input box */}
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
          />

          {/* Show the term being searched */}
          {initialTerm && (
            <h1 className="text-2xl font-bold">
              Results for: <span className="text-blue-600">{initialTerm}</span>
            </h1>
          )}

          {/* Show different content based on state */}
          {isLoading ? (
            <Carregant progress={progress} />
          ) : error ? (
            <div className="text-red-600 text-lg py-10 text-center">
              No results found for <strong>{initialTerm}</strong>.
            </div>
          ) : (
            results && <Resultats results={results} /> // Show results
          )}
        </div>
      </div>
    </div>
  );
}

// Loading screen component with progress bar and animated icons
function Carregant({ progress }) {
  const [dots, setDots] = useState(0);

  // Animate loading dots (...)
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="flex items-center gap-4 text-3xl text-blue-600">
        <FaRobot className="animate-bounce" />
        <FaReddit className="animate-pulse" />
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md bg-gray-300 h-2 rounded">
        <div
          className="bg-blue-500 h-2 rounded transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Animated dots text */}
      <p className="text-gray-500 text-lg">
        Loading{".".repeat(dots)}
      </p>
    </div>
  );
}
