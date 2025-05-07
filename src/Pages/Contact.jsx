import React from "react";
import { Helmet } from "react-helmet";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <div className={styles.contactPage}>
      <Helmet>
        <title>Contacte - FeelIt</title>
      </Helmet>

      {/* Title */}
      <h1 className={styles.contactTitle}>Contacte</h1>

      {/* Introductory paragraph with manual line break */}
      <p className={styles.contactIntro}>
        Si tens dubtes, suggeriments o t’interessa aquest projecte, estaré <br />
        encantat de parlar-ne!
      </p>

      {/* Contact items (icon + label + link all inline) */}
      <ul className={styles.contactList}>
        <li className={styles.contactItem}>
          <span className={styles.contactIcon}>📧</span>
          <strong> Correu electrònic:</strong>&nbsp;
          <a href="mailto:polglezcasals@gmail.com" className={styles.contactLink}>
            polglezcasals@gmail.com
          </a>
        </li>
        <li className={styles.contactItem}>
          <span className={styles.contactIcon}>💼</span>
          <strong> LinkedIn:</strong>&nbsp;
          <a
            href="https://linkedin.com/in/pol-gonzalez-casals"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            linkedin.com/in/pol-gonzalez-casals
          </a>
        </li>
        <li className={styles.contactItem}>
          <span className={styles.contactIcon}>💻</span>
          <strong> GitHub:</strong>&nbsp;
          <a
            href="https://github.com/ppolsii"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            github.com/ppolsii
          </a>
        </li>
      </ul>

      {/* Footer note */}
      <p className={styles.contactNote}>
        Si ets reclutador, estudiant, o simplement curiós, no dubtis en contactar.
      </p>
    </div>
  );
}
