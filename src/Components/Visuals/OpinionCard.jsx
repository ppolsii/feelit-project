// OpinionCard.jsx – Displays a single opinion in a card style

import React from "react";
import styles from "./Visuals.module.css";

export default function OpinionCard({ text, variant = "neutral" }) {
  const cardClass = variant === "positive"
    ? styles.opinionItemPositive
    : variant === "negative"
    ? styles.opinionItemNegative
    : styles.opinionItem;

  return (
    <div className={cardClass}>
      {text}
    </div>
  );
}
