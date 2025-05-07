// Home.jsx - Main landing page

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import SearchBar from "../Components/Search/SearchBar";
import fons from "../Assets/Fondo2.jpg";
import styles from "./Home.module.css";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState(""); // User input
  const navigate = useNavigate();

  // Handle the search button click
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      // --------------------------------------------------------
      // --------------------------------------------------------
      // [FRONTEND NAVIGATION] Redirect to /search with the keyword
      // --------------------------------------------------------
      // --------------------------------------------------------
      // The backend will be called from Search.jsx
      navigate(`/search?term=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Disable scrolling when this page is active
  useEffect(() => {
    document.body.classList.add("home-no-scroll");
    return () => {
      document.body.classList.remove("home-no-scroll");
    };
  }, []);

  return (
    <div
      className={styles.background}
      style={{ backgroundImage: `url(${fons})` }}
    >
      <Helmet>
        <title>Explore opinions - FeelIt</title>
      </Helmet>

      {/* Centered content */}
      <div className={styles.centerBox}>
        <h1 className={styles.mainTitle}>Opinion Analysis</h1>

        {/* Search bar component with input handlers */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
      </div>
    </div>
  );
}
