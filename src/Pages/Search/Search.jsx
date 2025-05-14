import React from "react";
import { Helmet } from "react-helmet";
import styles from "./Search.module.css"; 
import SearchHeader from "../../Components/Search/SearchHeader";
import LoadingScreen from "../../Components/Search/LoadingScreen";
import Resultats from "../../Components/Search/Resultats";
import { useLayoutContext } from "../../Context/LayoutContext";
import { useSearchLogic } from "../../hooks/useSearchLogic";

export default function Search() {
  const { setLayoutMode } = useLayoutContext();
  const {
    searchTerm,
    setSearchTerm,
    handleSearch,
    results,
    isLoading,
    progress,
    error,
    initialTerm,
    lastSearchTerm,
  } = useSearchLogic(setLayoutMode);

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
