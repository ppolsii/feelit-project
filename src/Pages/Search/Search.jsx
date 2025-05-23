import React from "react";
import { Helmet } from "react-helmet";

import styles from "./Search.module.css"; 

// Visual components
import SearchHeader from "../../Components/Search/SearchHeader";
import LoadingScreen from "../../Components/Search/LoadingScreen";
import Resultats from "../../Components/Search/Resultats";

// Context to change the layout
import { useLayoutContext } from "../../Context/LayoutContext";

// Personalized hook with the logic of the search
import { useSearchLogic } from "../../hooks/useSearchLogic";

export default function Search() {
  const { setLayoutMode } = useLayoutContext(); // Activate the layout mode

  // Data and functions of useSearchLogic
  const {
    searchTerm,
    setSearchTerm,
    handleSearch,
    results, // JSON data from the server
    isLoading, // Loading state
    progress, // Percentage of loading
    error,
    initialTerm, // Initial term from the URL
    lastSearchTerm, // Last term searched
  } = useSearchLogic(setLayoutMode);

  return (
    <div className={`${styles.searchPage} ${isLoading ? styles.centeredPage : ""}`}>
      <Helmet>
        <title>Search Results - FeelIt</title>
        <meta name="description" content={`Opinions about ${initialTerm}`} />
      </Helmet>

      {/* While loading, show the LoadingScreen */}
      {isLoading ? (
        <LoadingScreen progress={progress} />
      ) : (
        // Load done or error
        <div className={styles.searchContainer}>
          {/* Search bar and button */}
          <SearchHeader
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
            initialTerm={initialTerm || lastSearchTerm}
          />
          {/* Error on loading results */}
          {error ? (
            <div className={styles.searchError}>
              No results found for <strong>{initialTerm}</strong>.
            </div>
          ) : (
            // Show results if all is ok
            results && <Resultats results={results} />
          )}
        </div>
      )}
    </div>
  );
}
