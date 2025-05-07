// Home.jsx - Main landing page

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import SearchBar from "../Components/Search/SearchBar";
import fons from "../Assets/Fondo2.jpg";
import styles from "./Home.module.css";
import { useLayoutContext } from "../Context/LayoutContext"; // 🆕

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { setLayoutMode } = useLayoutContext(); // 🆕

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search?term=${encodeURIComponent(searchTerm)}`);
    }
  };

  // 🔁 Quan l’usuari entra a /home, fixem el layoutMode a 'inici'
  useEffect(() => {
    setLayoutMode("inici");
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
