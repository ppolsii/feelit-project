// src/pages/Contact.jsx
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

export default function Contact() {
  const contactLinks = [
    {
      label: "Correu electrònic",
      value: "polglezcasals@gmail.com",
      href: "mailto:polglezcasals@gmail.com",
      icon: "📧",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/pol-gonzalez-casals",
      href: "https://www.linkedin.com/in/pol-gonzalez-casals",
      icon: "💼",
    },
    {
      label: "GitHub",
      value: "github.com/ppolsii",
      href: "https://github.com/ppolsii",
      icon: "💻",
    },
  ];

  // 🔒 Bloquem scroll només mentre estiguem a la Contact
    useEffect(() => {
      document.body.classList.add("contact-no-scroll");
      return () => {
        document.body.classList.remove("contact-no-scroll");
      };
    }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>Contacte amb l’autor - FeelIt</title>
      </Helmet>

      <div className="max-w-2xl mx-auto p-6 space-y-6 text-blue-gray-800">
        <h1 className="text-4xl font-bold text-center">Contacte</h1>

        <p className="text-lg text-center">
          Si tens dubtes, suggeriments o t’interessa aquest projecte, estaré encantat de parlar-ne!
        </p>

        <div className="space-y-2 text-center">
          {contactLinks.map((item, idx) => (
            <p key={idx}>
              {item.icon} <strong>{item.label}:</strong>{" "}
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                {item.value}
              </a>
            </p>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500">
          Si ets reclutador, estudiant, o simplement curiós, no dubtis en contactar.
        </p>
      </div>
    </div>
  );
}
