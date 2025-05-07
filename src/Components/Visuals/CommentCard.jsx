// CommentCard.jsx – Displays a single user comment styled by sentiment type

import React from "react";
import styles from "./Visuals.module.css"; // Import custom styles for layout and colors

export default function CommentCard({ comentari }) {
  // Destructure comment data
  const { text, sentiment, vots, respostes } = comentari;

  // Get the style class for the sentiment (positive, negative, or neutral)
  const sentimentClass = styles[`commentCard_${sentiment}`] || styles.commentCard_neutre;

  return (
    // Card container with rounded border, background, and shadow
    <div className={`${styles.commentCard} ${sentimentClass}`}>
      
      {/* Main comment text */}
      <p className={styles.commentText}>
        {text}
      </p>

      {/* Additional info: vote count, reply count, and sentiment label */}
      <div className={styles.commentInfo}>
        <span>
          Vots: <strong>{vots}</strong>
        </span>
        <span>
          Respostes: <strong>{respostes}</strong>
        </span>
        <span>
          Sentiment: <span className={styles.commentSentiment}>{sentiment}</span>
        </span>
      </div>
    </div>
  );
}
