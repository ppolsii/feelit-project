// SearchButton.jsx - Button used in the search bar

import React from "react";
import styles from "./Search.module.css"; // Import CSS module for styling

// This button triggers the search when clicked
export default function SearchButton({ onClick }) {
  return (
    <button
      type="submit" // Button will submit the form it's inside
      onClick={onClick} // Run the provided onClick function
      className={styles.searchButton} 
    >
      Cercar
    </button>
  );
}
