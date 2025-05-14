// NotFound.jsx - Page shown when route is not found

import React from "react";
import { Link } from "react-router-dom"; // For navigation
import SearchBar from "../Components/Search/SearchBar"; // Optional: reuse SearchBar
import styles from "./Modules/Search.module.css"; // Reuse CSS already defined

export default function NotFound() {
  return (
    <div className={styles.searchPage}>
      <div className={styles.searchContainer}>
        {/* Title */}
        <h1 className={styles.searchTitle}>404 - Page not found</h1>

        {/* Subtitle */}
        <p className={styles.searchError}>
          Oops! The page you're looking for doesn't exist.
        </p>

        {/* SearchBar centered with fixed width */}
        <div className={styles.searchBarWrapper}>
          <SearchBar />
        </div>

        {/* Link to return to homepage */}
        <div style={{ textAlign: "center" }}>
          <Link to="/home" className={styles.searchTerm}>
            ← Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
