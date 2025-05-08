// Home.jsx - Main landing page where the user can start a search

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import SearchBar from "../Components/Search/SearchBar";
import fons from "../Assets/Fondo2.jpg";
import styles from "./Modules/Home.module.css"; // CSS module for styling
import { useLayoutContext } from "../Context/LayoutContext"; // For setting layout mode to 'inici'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState(""); // User input from the search bar
  const navigate = useNavigate();
  const { setLayoutMode } = useLayoutContext(); // Set global layout mode to 'inici'

  // Handle the search button click
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      // Navigate to /search with the given keyword
      navigate(`/search?term=${encodeURIComponent(searchTerm)}`);
    }
  };

  // When the home page loads, set layoutMode to 'inici' and disable scroll
  useEffect(() => {
    setLayoutMode("inici");
    document.body.classList.add("home-no-scroll");
    return () => {
      document.body.classList.remove("home-no-scroll");
    };
  }, []);

  // Page layout with background and search bar
  return (
    <div
      className={styles.background}
      style={{ backgroundImage: `url(${fons})` }}
    >
      <Helmet>
        <title>Explore opinions - FeelIt</title>
      </Helmet>

      <div className={styles.centerBox}>
        <h1 className={styles.mainTitle}>Opinion Analysis</h1>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
      </div>
    </div>
  );
}
