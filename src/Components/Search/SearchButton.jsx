// SearchButton.jsx - Button used in the search bar

import React from "react";

// This button triggers the search when clicked
export default function SearchButton({ onClick }) {
  return (
    <button
      type="submit" // Button will submit the form it's inside
      onClick={onClick} // Run the provided onClick function
      className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors"
    >
      Cercar {/* Button text */}
    </button>
  );
}
