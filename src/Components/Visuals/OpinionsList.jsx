// OpinionsList.jsx – Displays opinion summaries and top comments grouped by sentiment

import React from "react";
import styles from "./Visuals.module.css"; // Import scoped styles for layout and colors

export default function OpinionsList({ opinions = {}, comentaris = {} }) {
  // Extract positive and negative opinion summaries
  const { positives = [], negatives = [] } = opinions;

  // Extract individual comments classified as positive or negative
  const { positius = [], negatius = [] } = comentaris;

  // Filter and sort top 3 positive comments by vote count
  const destacatsPositius = [...positius]
    .filter(c => c.text?.trim() !== "")
    .sort((a, b) => b.vots - a.vots)
    .slice(0, 3);

  // Filter and sort top 3 negative comments by vote count
  const destacatsNegatius = [...negatius]
    .filter(c => c.text?.trim() !== "")
    .sort((a, b) => b.vots - a.vots)
    .slice(0, 3);

  return (
    // Two-column layout (positive on left, negative on right)
    <div className={styles.opinionsGrid}>
      
      {/* Column: Positive opinions */}
      <div className={styles.opinionColumn}>

        {/* Box: Summary of positive opinions */}
        <div className={styles.opinionBoxPositive}>
          <h3 className={styles.opinionTitlePositive}>Positive opinions</h3>
          <ul className={styles.opinionList}>
            {positives.length > 0 ? (
              positives.map((op, i) => (
                <li key={i} className={styles.opinionItem}>{op}</li>
              ))
            ) : (
              <li>No positive opinions available.</li>
            )}
          </ul>
        </div>

        {/* Box: Top 3 most voted positive comments */}
        <div className={styles.opinionBoxPositive}>
          <h3 className={styles.opinionTitlePositive}>Top positive comments</h3>
          <ul className={styles.commentList}>
            {destacatsPositius.length > 0 ? (
              destacatsPositius.map((c, i) => (
                <li key={i} className={styles.commentItem}>
                  <p className={styles.commentTextPositive}>{c.text}</p>
                  <span className={styles.commentMeta}>
                    Vots: {c.vots} · Respostes: {c.respostes}
                  </span>
                </li>
              ))
            ) : (
              <li>No top positive comments.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Column: Negative opinions */}
      <div className={styles.opinionColumn}>

        {/* Box: Summary of negative opinions */}
        <div className={styles.opinionBoxNegative}>
          <h3 className={styles.opinionTitleNegative}>Negative opinions</h3>
          <ul className={styles.opinionList}>
            {negatives.length > 0 ? (
              negatives.map((op, i) => (
                <li key={i} className={styles.opinionItem}>{op}</li>
              ))
            ) : (
              <li>No negative opinions available.</li>
            )}
          </ul>
        </div>

        {/* Box: Top 3 most voted negative comments */}
        <div className={styles.opinionBoxNegative}>
          <h3 className={styles.opinionTitleNegative}>Top negative comments</h3>
          <ul className={styles.commentList}>
            {destacatsNegatius.length > 0 ? (
              destacatsNegatius.map((c, i) => (
                <li key={i} className={styles.commentItem}>
                  <p className={styles.commentTextNegative}>{c.text}</p>
                  <span className={styles.commentMeta}>
                    Vots: {c.vots} · Respostes: {c.respostes}
                  </span>
                </li>
              ))
            ) : (
              <li>No top negative comments.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
