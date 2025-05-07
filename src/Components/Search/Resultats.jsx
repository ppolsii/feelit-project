// Resultats.jsx - This component shows the results after a search

import React from "react";
import SentimentChart from "../Visuals/SentimentChat"; // Component to show a chart
import OpinionsList from "../Visuals/OpinionsList"; // Component to show summaries and comments
import styles from "./SearchComponent.module.css"; // Import CSS module for styling

export default function Resultats({ results }) {
  // Get the data from the JSON: sentiments, opinions, and individual comments
  const { sentiments, opinions, comentaris } = results;

  // Filter only positive comments
  const comentarisPositius = comentaris.filter(c => c.sentiment === "positiu");

  // Filter only negative comments
  const comentarisNegatius = comentaris.filter(c => c.sentiment === "negatiu");

  return (
    <div className={styles.resultats}>
      {/* Show sentiment distribution in a chart */}
      <SentimentChart sentiments={sentiments} />

      {/* Show opinion summaries and top comments */}
      <OpinionsList 
        opinions={opinions} 
        comentaris={{ positius: comentarisPositius, negatius: comentarisNegatius }} 
      />
    </div>
  );
}
