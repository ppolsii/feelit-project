// SearchBar.jsx - Component that show a search bar with a text input and a button

import React from "react";
import SearchButton from "./SearchButton";
import styles from "./SearchComponent.module.css";


// Get three props: searchTerm (value of the text field), setSearchTerm (function to update it), 
// and handleSearch (function that is executed when the user wants to search)
export default function SearchBar({ searchTerm, setSearchTerm, handleSearch }) {
  
  // Function that is executed when the form is submitted (e.g., user presses Enter)
  const handleSubmit = (e) => {
    e.preventDefault();   // Page is not reloaded when the form is submitted
    handleSearch();       // Shouts the function to perform the search
  };

  return (
    // Form that contains the text input and the button - When submitted (Enter or click), handleSubmit is executed
    <form onSubmit={handleSubmit} className={styles.searcBarhForm}>
      
      {/* Input de text on l'usuari escriu el terme de cerca */}
      <input
        type="text"                          
        className={styles.searchBarInput}    
        placeholder="Cerca un tema..."      
        value={searchTerm}                  // Value currently in the input (controlled component)
        onChange={(e) => setSearchTerm(e.target.value)}  // Each time the input changes, update the state with the new value
      />

      {/*Search button. Does the same thing as the submit: calls handleSearch */}
      <SearchButton onClick={handleSearch} />
    </form>
  );
}
