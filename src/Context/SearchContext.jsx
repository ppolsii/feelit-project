// SearchContext.jsx - This file manages the search state globally using React Context

import React, { createContext, useState } from "react";

// 🔵 Create the search context so other components can use it
export const SearchContext = createContext();

// This component wraps other components and provides the searchTerm and setSearchTerm values
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState(""); // State to store the current search term

  return (
    // 🔁 All components inside this provider can access the search state
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
