import React from "react";
import styles from "./Visuals.module.css";
import OpinionCard from "./OpinionCard.jsx";
import CommentCard from "./CommentCard.jsx"; 

export default function OpinionsList({ opinions = {}, comentaris = {} }) {
  const { positives = [], negatives = [] } = opinions;
  const { positius = [], negatius = [] } = comentaris;

  const destacatsPositius = [...positius]
    .filter(c => c.text?.trim() !== "")
    .sort((a, b) => b.vots - a.vots)
    .slice(0, 3);

  const destacatsNegatius = [...negatius]
    .filter(c => c.text?.trim() !== "")
    .sort((a, b) => b.vots - a.vots)
    .slice(0, 3);

  return (
    <div className={styles.opinionsGrid}>
      {/* Positive column */}
      <div className={styles.opinionColumn}>
        <div className={styles.opinionBoxPositive}>
          <h3 className={styles.opinionTitlePositive}>Positive opinions</h3>
          <ul className={styles.opinionList}>
            {positives.length > 0 ? (
              positives.map((op, i) => (
                <li key={i}><OpinionCard text={op} variant="positive" /></li>
              ))
            ) : (
              <li>No positive opinions available.</li>
            )}
          </ul>
        </div>

        <div className={styles.opinionBoxPositive}>
          <h3 className={styles.opinionTitlePositive}>Top positive comments</h3>
          <ul className={styles.commentList}>
            {destacatsPositius.length > 0 ? (
              destacatsPositius.map((c, i) => (
               <li key={i}>
                <CommentCard comentari={c} />
                </li>
              ))
            ) : (
              <li>No top positive comments.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Negative column */}
      <div className={styles.opinionColumn}>
        <div className={styles.opinionBoxNegative}>
          <h3 className={styles.opinionTitleNegative}>Negative opinions</h3>
          <ul className={styles.opinionList}>
            {negatives.length > 0 ? (
              negatives.map((op, i) => (
                <li key={i}><OpinionCard text={op} variant="negative" /></li>
              ))
            ) : (
              <li>No negative opinions available.</li>
            )}
          </ul>
        </div>

        <div className={styles.opinionBoxNegative}>
          <h3 className={styles.opinionTitleNegative}>Top negative comments</h3>
          <ul className={styles.commentList}>
            {destacatsNegatius.length > 0 ? (
              destacatsNegatius.map((c, i) => (
               <li key={i}>
                <CommentCard comentari={c} />
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
