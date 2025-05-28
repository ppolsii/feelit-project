// CommentCard.jsx – Displays a single user comment styled by sentiment type

import React from "react";
import styles from "./Visuals.module.css"; // Import custom styles

export default function CommentCard({ comentari }) {

  if (!comentari) return null;
  const { text, sentiment, vots, respostes } = comentari;

  const sentimentClass = styles[`commentCard_${sentiment}`] || styles.commentCard_neutre;

  return (
    <div className={`${styles.commentCard} ${sentimentClass}`}>
      <p className={styles.commentText}>
        {text}
      </p>
      <div className={styles.commentInfo}>
        <span>Vots: <strong>{vots}</strong></span>
        <span>Respostes: <strong>{respostes}</strong></span>
        <span>Sentiment: <span className={styles.commentSentiment}>{sentiment}</span></span>
      </div>
    </div>
  );
}
