// Home.jsx - This is the landing page of the app

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Allows navigation between pages
import { Helmet } from "react-helmet"; // Sets the page title
import SearchBar from "../Components/Search/SearchBar"; // Search bar component
import fons from "../Assets/Fondo2.jpg"; // Background image

export default function Home() {
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const navigate = useNavigate();

  // When user clicks search
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      // Redirect to search page with the query as URL parameter
      navigate(`/search?term=${encodeURIComponent(searchTerm)}`);
    }
  };

  // 🔒 Lock scroll while on the Home page
  useEffect(() => {
    document.body.classList.add("home-no-scroll");
    return () => {
      document.body.classList.remove("home-no-scroll");
    };
  }, []);

  return (
    // Full screen background with the selected image
    <div
      className="h-screen w-screen overflow-hidden bg-cover bg-center relative"
      style={{ backgroundImage: `url(${fons})` }}
    >

      {/* Alternatives for background:
          Gray background version:
          <div className="h-[calc(100vh-96px)] overflow-hidden bg-gray-100 relative">
          
          Image background version (used):
          <div className="h-screen w-screen overflow-hidden bg-cover bg-center relative" style={{ backgroundImage: `url(${fons})` }}>
      */}

      <Helmet>
        <title>Explora opinions - FeelIt</title> {/* Page title */}
      </Helmet>

      {/* Centered content box */}
      <div className="absolute left-1/2 top-1/2 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 p-6 space-y-6">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg text-center">
          Anàlisi d'opinions
        </h1>

        {/* Alternative titles based on background:
            Gray:
            <h1 className="text-4xl font-bold text-center text-blue-gray-900"> Anàlisi d'opinions </h1>
            Image:
            <h1 className="text-4xl font-bold text-white drop-shadow-lg text-center"> Anàlisi d'opinions </h1>
        */}

        {/* Search bar with input field and button */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
      </div>
    </div>
  );
}
