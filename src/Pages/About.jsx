// About.jsx – Full informational page about the FeelIt project

import React from "react";
import { Helmet } from "react-helmet"; // For setting the page title dynamically
import styles from "./Module/About.module.css"; // Import scoped styles

export default function About() {
  return (
    <div className={styles.aboutPage}>
      {/* HTML metadata (page title) */}
      <Helmet>
        <title>Sobre el projecte - FeelIt</title>
      </Helmet>

      {/* Main content container */}
      <div className={styles.aboutContent}>
        {/* Title */}
        <h1 className={styles.aboutTitle}>Sobre el projecte</h1>

        {/* Project purpose section */}
        <section className={styles.aboutSection}>
          <h2 className={styles.aboutSubtitle}>Finalitat del projecte</h2>
          <p className={styles.aboutParagraph}>
            FeelIt és una eina web desenvolupada en el marc del Treball de Final de Grau en Enginyeria, amb l'objectiu de
            analitzar de manera estructurada les opinions expressades a Internet sobre qualsevol tema d'interès: destinacions, marques, figures públiques, productes, i més.
          </p>
          <p className={styles.aboutParagraph}>
            A través d’una interfície intuïtiva, els usuaris poden realitzar cerques específiques i obtenir una
             síntesi visual i analítica de les opinions més representatives recollides de Reddit, una de les plataformes més dinàmiques i diverses d'opinió actual.
          </p>
        </section>

        {/* System functionality */}
        <section className={styles.aboutSection}>
          <h2 className={styles.aboutSubtitle}>Funcionament del sistema</h2>
          <p className={styles.aboutParagraph}>
            En introduir un terme de cerca (per exemple, "viatjar a Malta" o "intel·ligència artificial"), el sistema accedeix automàticament a
             Reddit i recull els comentaris més rellevants associats.
          </p>
          <p className={styles.aboutParagraph}>
            Posteriorment, els comentaris són processats per identificar aquells amb informació útil, classificar-los segons el seu
            sentiment (positiu, negatiu o neutre) i generar un resum visual clar, facilitant així una interpretació ràpida de la percepció general de la comunitat.
          </p>
        </section>

        {/* Technical implementation */}
        <section className={styles.aboutSection}>
          <h2 className={styles.aboutSubtitle}>Aspectes tècnics</h2>
          <p className={styles.aboutParagraph}>
            La plataforma utilitza <code className={styles.aboutCode}>PRAW</code> per interactuar amb l'API de Reddit i obtenir fins a 100 comentaris rellevants per cada cerca.
            Aquests comentaris són analitzats mitjançant un model d'intel·ligència artificial (DistilBERT), aplicant tècniques de transfer learning per filtrar la informació no pertinent.
          </p>
        </section>
      </div>
    </div>
  );
}
