// src/pages/About.jsx
import React from "react";
import { Helmet } from "react-helmet";
import fons from "../assets/Fondo2.jpg";

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
          <h2 className="text-2xl font-semibold">Per a què serveix?</h2>
          <p className="text-lg leading-relaxed">
            Aquest projecte forma part del meu Treball de Final de Grau en Enginyeria, i té com a objectiu oferir una eina web que permeti
            <strong> entendre què pensa la gent a Internet sobre qualsevol tema</strong>: una destinació, una marca, una persona pública, un producte, etc.
          </p>
          <p className="text-lg leading-relaxed">
            A través d’una interfície senzilla, els usuaris poden fer una cerca i obtenir una
            <strong> visió resumida de les opinions més destacades</strong> que s’han expressat a Reddit, una de les plataformes més actives i diverses de debat actual.
          </p>
        </section>

        {/* Funcionament */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Com funciona?</h2>
          <p className="text-lg leading-relaxed">
            Quan introdueixes un tema de cerca (com ara “viatjar a Malta” o “intel·ligència artificial”), el sistema accedeix automàticament a
            <strong> Reddit</strong> i recull els comentaris més rellevants sobre aquest tema.
          </p>
          <p className="text-lg leading-relaxed">
            Aquests comentaris es processen per identificar-ne les opinions realment útils, es classifiquen segons el
            <strong> sentiment</strong> (positiu, negatiu o neutre) i es resumeixen en un format visual i entenedor.
          </p>
        </section>

        {/* Detalls tècnics */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Detalls tècnics</h2>
          <p className="text-lg leading-relaxed">
            El sistema utilitza la llibreria <code className="bg-gray-200 px-1 rounded">PRAW</code> per interactuar amb l’API de Reddit i obtenir fins a 100 comentaris per cerca.
            Aquests comentaris passen per un model <strong>DistilBERT</strong> que filtra la informació no rellevant mitjançant
            <strong> transfer learning</strong> amb dades prèviament etiquetades.
          </p>
          <p className="text-lg leading-relaxed">
            Per millorar l’anàlisi, també s’integra l’API de <strong>ChatGPT</strong>, que permet identificar sentiments i generar
            <strong> resums textuals clars</strong>. Els resultats es mostren dins d’una aplicació web desenvolupada amb
            <strong> React + TailwindCSS</strong>, pensada per a ser accessible i escalable.
          </p>
        </section>

        {/* Motivació */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Motivació</h2>
          <p className="text-lg leading-relaxed">
            En un moment on les xarxes socials són plenes d’opinions, però també de soroll i desinformació, aquest projecte busca oferir una eina clara per
            <strong> veure el que pensa la comunitat de manera estructurada i útil</strong>.
          </p>
          <p className="text-lg leading-relaxed">
            El repte tècnic ha estat combinar la captació de dades, el processament lingüístic i la visualització intuïtiva, aprenent a integrar tecnologies diverses i a fer-les accessibles a qualsevol usuari.
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
