import React from "react";
import styles from "./Contact.module.css";

export default function ContactItem({ icon, label, href, linkText }) {
  return (
    <li className={styles.contactItem}>
      <span className={styles.contactIcon}>{icon}</span>
      <strong> {label}</strong>&nbsp;
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.contactLink}
      >
        {linkText}
      </a>
    </li>
  );
}
