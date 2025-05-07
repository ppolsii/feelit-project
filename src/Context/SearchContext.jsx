// SearchContext.jsx - Global state for search and persistence

import React, { createContext, useState, useContext } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [lastSearchTerm, setLastSearchTerm] = useState(""); // Nou estat

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        hasSearched,
        setHasSearched,
        searchResults,
        setSearchResults,
        lastSearchTerm,
        setLastSearchTerm,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
