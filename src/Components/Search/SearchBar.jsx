// SearchBar.jsx - Input field and button to enter a search term

import React from "react";
import SearchButton from "./SearchButton"; // Import the search button component

export default function SearchBar({ searchTerm, setSearchTerm, handleSearch }) {
  // When user submits the form (press Enter or clicks button)
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    handleSearch(); // Run the search function
  };

  return (
    <form
      onSubmit={handleSubmit} // Run when the form is submitted
      className="flex w-full items-center gap-2"
    >
      {/* Input box where user types the topic */}
      <input
        type="text"
        className="flex-1 rounded border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="Cerca un tema..." // Placeholder text
        value={searchTerm} // Controlled input value
        onChange={(e) => setSearchTerm(e.target.value)} // Update the input value
      />

      {/* Button to start the search */}
      <SearchButton onClick={handleSearch} />
    </form>
  );
}
