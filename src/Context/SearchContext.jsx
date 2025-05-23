// SearchContext.jsx - Global state for search and persistence

import React, { createContext, useState, useContext } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Term searched
  const [hasSearched, setHasSearched] = useState(false); // Boolean to check if the user has searched
  const [searchResults, setSearchResults] = useState(null); // Results of the search
  const [lastSearchTerm, setLastSearchTerm] = useState(""); // Last term searched

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
