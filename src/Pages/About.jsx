// src/pages/About.jsx
import React from "react";
import { Helmet } from "react-helmet";
import fons from "../Assets/Fondo2.jpg";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>Sobre el projecte - FeelIt</title>
      </Helmet>

      <div className="max-w-4xl mx-auto p-6 space-y-12 text-blue-gray-800">
        <h1 className="text-4xl font-bold text-center">Sobre el projecte</h1>

        {/* Introducció */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Finalitat del projecte</h2>
          <p className="text-lg leading-relaxed">
            <strong>FeelIt</strong> és una eina web desenvolupada en el marc del Treball de Final de Grau en Enginyeria, amb l'objectiu de
            <strong> analitzar de manera estructurada les opinions expressades a Internet</strong> sobre qualsevol tema d'interès: destinacions, marques, figures públiques, productes, i més.
          </p>
          <p className="text-lg leading-relaxed">
            A través d’una interfície intuïtiva, els usuaris poden realitzar cerques específiques i obtenir una
            <strong> síntesi visual i analítica de les opinions més representatives</strong> recollides de Reddit, una de les plataformes més dinàmiques i diverses d'opinió actual.
          </p>
        </section>

        {/* Funcionament */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Funcionament del sistema</h2>
          <p className="text-lg leading-relaxed">
            En introduir un terme de cerca (per exemple, "viatjar a Malta" o "intel·ligència artificial"), el sistema accedeix automàticament a
            <strong> Reddit</strong> i recull els comentaris més rellevants associats.
          </p>
          <p className="text-lg leading-relaxed">
            Posteriorment, els comentaris són processats per identificar aquells amb informació útil, classificar-los segons el seu
            <strong> sentiment</strong> (positiu, negatiu o neutre) i generar un resum visual clar, facilitant així una interpretació ràpida de la percepció general de la comunitat.
          </p>
        </section>

        {/* Detalls tècnics */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Aspectes tècnics</h2>
          <p className="text-lg leading-relaxed">
            La plataforma utilitza <code className="bg-gray-200 px-1 rounded">PRAW</code> per interactuar amb l'API de Reddit i obtenir fins a 100 comentaris rellevants per cada cerca.
            Aquests comentaris són analitzats mitjançant un model d'
            <strong>intel·ligència artificial</strong> (<strong>DistilBERT</strong>), aplicant tècniques de <strong>transfer learning</strong> per filtrar la informació no pertinent.
          </p>
          <p className="text-lg leading-relaxed">
            Per optimitzar l'anàlisi de sentiments i millorar els resums generats, s'integra l'<strong>API de ChatGPT</strong>.
            Tot el sistema està implementat amb <strong>React</strong> i <strong>TailwindCSS</strong> al frontend, assegurant una experiència fluida, escalable i accessible per a tot tipus d'usuaris.
          </p>
        </section>

        {/* Motivació */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Motivació i propòsit</h2>
          <p className="text-lg leading-relaxed">
            En un entorn digital saturat d'informació, opinions i continguts sovint dispersos, <strong>FeelIt</strong> pretén ser una eina útil per
            <strong> capturar i estructurar l’opinió col·lectiva de manera clara i fiable</strong>.
          </p>
          <p className="text-lg leading-relaxed">
            El projecte representa també un repte tecnològic: integrar l'extracció de dades, el processament lingüístic i la visualització gràfica,
            combinant diferents tecnologies avançades en un sol servei orientat a l'usuari.
          </p>
        </section>

        {/* Crèdits finals */}
        <div className="text-sm text-center text-gray-500 pt-6 border-t">
          Desenvolupat per <strong>Pol González Casals</strong> – Universitat Autònoma de Barcelona (2025)
        </div>
      </div>
    </div>
  );
}
