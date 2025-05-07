import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Search.module.css"; // Import custom styles for layout and components

function Search() {
  // Get the current URL location
  const location = useLocation();

  // Extract the ?term= parameter from the URL
  const params = new URLSearchParams(location.search);
  const initialTerm = params.get("term") || "";

  // State for loading, progress, result data and error handling
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(false);

  // Trigger data fetching every time the search term changes
  useEffect(() => {
    // If the term is empty, do nothing
    if (!initialTerm.trim()) return;

    // Start loading state and reset other UI elements
    setIsLoading(true);
    setError(false);
    setProgress(0);

    // 🔵 STEP 1: Call the backend to generate a new CSV file based on the search term
    fetch(`http://localhost:8000/api/search?keyword=${encodeURIComponent(initialTerm)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error generating CSV");
        return res.json();
      })
      .then((data) => {
        console.log("CSV generated successfully:", data.message);
      })
      .catch((err) => {
        console.error("Error generating CSV:", err);
      });

    // 🔵 STEP 2: While waiting, simulate loading with a progress bar and mock data
    const simulateProgress = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;
        return next >= 90 ? 90 : next; // Stop at 90% until real data arrives
      });
    }, 30);

    // After a short delay, load mock data to simulate results
    const timeout = setTimeout(() => {
      fetch("/data/mockResults.json")
        .then((res) => {
          if (!res.ok) throw new Error("Error loading mockResults");
          return res.json();
        })
        .then((data) => {
          setProgress(100); // Complete the progress bar
          setResults(data); // Store the results
        })
        .catch((err) => {
          console.error("Error loading mock data:", err);
          setError(true);
        })
        .finally(() => {
          clearInterval(simulateProgress);
          setIsLoading(false); // Stop the loading state
        });
    }, 1500); // Simulated backend response time

    // Clean up timers when component unmounts or term changes
    return () => {
      clearInterval(simulateProgress);
      clearTimeout(timeout);
    };
  }, [initialTerm]);

  return (
    <div className={styles.searchPage}>
      {/* Show progress bar and loading message */}
      {isLoading && (
        <div>
          <p className={styles.searchLoadingText}>Buscant...</p>
          <div className={styles.searchProgressBar}>
            <div
              className={styles.searchProgressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Show error message if loading fails */}
      {error && (
        <div className={styles.searchError}>
          Error carregant resultats.
        </div>
      )}

      {/* Show result content if available */}
      {results && (
        <div className={styles.searchResults}>
          {/* Here you can render your result component */}
          {/* Example: <Resultats results={results} /> */}
        </div>
      )}
    </div>
  );
}

export default Search;
