// Components/Search/SearchHeader.jsx

import React from "react";
import SearchBar from "./SearchBar";
import styles from "./SearchComponent.module.css"; // Adjust the path as necessary

export default function SearchHeader({ searchTerm, setSearchTerm, handleSearch, initialTerm }) {
  return (
    <>
      <div className={styles.searchBarWrapper}>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
      </div>
      {initialTerm && (
        <h1 className={styles.searchTitle}>
          Results for: <span className={styles.searchTerm}>{initialTerm}</span>
        </h1>
      )}
    </>
  );
}
