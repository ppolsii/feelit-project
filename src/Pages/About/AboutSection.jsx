import React from "react";
import styles from "./About.module.css";

export default function AboutSection({ title, children }) {
  return (
    <section className={styles.aboutSection}>
      <h2 className={styles.aboutSubtitle}>{title}</h2>
      {children}
    </section>
  );
}
