// Components/Search/LoadingScreen.jsx

import React, { useEffect, useState } from "react";
import { FaRobot, FaReddit } from "react-icons/fa";
import styles from "./Search.module.css"; // Adjust the path as necessary

export default function LoadingScreen({ progress }) {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loadingIcons}>
        <FaRobot className={styles.iconBounce} />
        <FaReddit className={styles.iconPulse} />
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className={styles.loadingText}>Loading{".".repeat(dots)}</p>
    </div>
  );
}
