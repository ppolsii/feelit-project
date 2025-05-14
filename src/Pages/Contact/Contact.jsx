import React from "react";
import { Helmet } from "react-helmet";
import styles from "./Contact.module.css";
import ContactItem from "./ContactItem";

export default function Contact() {
  return (
    <div className={styles.contactPage}>
      <Helmet>
        <title>Contact - FeelIt</title>
      </Helmet>

      <h1 className={styles.contactTitle}>Contact</h1>

      <p className={styles.contactIntro}>
        If you have any questions, suggestions, or if you're interested in this project, I'd be <br />
        happy to hear from you!
      </p>

      <ul className={styles.contactList}>
        <ContactItem
          icon="📧"
          label="Email:"
          href="mailto:polglezcasals@gmail.com"
          linkText="polglezcasals@gmail.com"
        />
        <ContactItem
          icon="💼"
          label="LinkedIn:"
          href="https://linkedin.com/in/pol-gonzalez-casals"
          linkText="linkedin.com/in/pol-gonzalez-casals"
        />
        <ContactItem
          icon="💻"
          label="GitHub:"
          href="https://github.com/ppolsii"
          linkText="github.com/ppolsii"
        />
      </ul>

      <p className={styles.contactNote}>
        Whether you're a recruiter, a student, or just curious, feel free to reach out!
      </p>
    </div>
  );
}
