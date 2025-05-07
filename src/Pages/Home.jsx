// Home.jsx - This is the landing page of the app

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Allows navigation between pages
import { Helmet } from "react-helmet"; // Sets the page title
import SearchBar from "../Components/Search/SearchBar"; // Search bar component
import fons from "../Assets/Fondo2.jpg"; // Background image
import styles from "./Home.module.css"; // CSS styles for Home page

export default function Home() {
  const [searchTerm, setSearchTerm] = useState(""); // Input text state
  const navigate = useNavigate();

  // Handle search button click
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      // Redirect to /search with query
      navigate(`/search?term=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Disable scroll on Home page background
  useEffect(() => {
    document.body.classList.add("home-no-scroll");
    return () => {
      document.body.classList.remove("home-no-scroll");
    };
  }, []);

  return (
    // Full-screen background image
    <div
      className={styles.background}
      style={{ backgroundImage: `url(${fons})` }}
    >
      <Helmet>
        <title>Explora opinions - FeelIt</title>
      </Helmet>

      {/* Centered box with title and search */}
      <div className={styles.centerBox}>
        <h1 className={styles.mainTitle}>Anàlisi d'opinions</h1>

        {/* SearchBar receives search state and function */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
      </div>
    </div>
  );
}
