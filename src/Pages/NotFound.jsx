// NotFound.jsx - This page appears when a user visits a route that doesn't exist

import React from "react";
import { Link } from "react-router-dom"; // Allows navigation to another route

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-6 bg-gray-100">
      {/* Big red "404" to show the error */}
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>

      {/* Message saying the page was not found */}
      <p className="text-xl text-gray-700 mb-6">
        Ups! Aquesta pàgina no existeix.
      </p>

      {/* Link to return to the home page */}
      <Link
        to="/home"
        className="text-blue-600 hover:underline text-lg"
      >
        ⬅️ Tornar a l’inici
      </Link>
    </div>
  );
}
