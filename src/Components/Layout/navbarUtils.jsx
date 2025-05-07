// navbarUtils.js - Utility functions for building parts of the navbar

import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import { NavLink, Link } from "react-router-dom";
import styles from "./Layout.module.css";

// Returns the logo JSX element depending on the selected style
export function getLogoVariant(style = 0) {
  // Base style for the logo text (shared in multiple styles)
  const baseClass = styles.navbarUtilsLogoBase;

  switch (style) {
    case 1:
      // Style 1: "Feel" in dark gray, "It" in blue
      return (
        <Typography as={Link} to="/home" className={baseClass}>
          <span className={styles.navbarUtilsTextSecondary}>Feel</span>
          <span className={styles.navbarUtilsTextPrimary}>It</span>
        </Typography>
      );

    case 2:
      // Style 2: Larger bold logo with "It" italic and blue
      return (
        <Typography
          as={Link}
          to="/home"
          className={styles.navbarUtilsLogoLarge}
        >
          Feel
          <span
            className={`${styles.navbarUtilsTextPrimary} ${styles.navbarUtilsTextItalic}`}
          >
            It
          </span>
        </Typography>
      );

    default:
      // Default style: "Feel" in blue, "It" in dark gray
      return (
        <Typography as={Link} to="/home" className={baseClass}>
          <span className={styles.navbarUtilsTextPrimary}>Feel</span>
          <span className={styles.navbarUtilsTextSecondary}>It</span>
        </Typography>
      );
  }
}

// Returns a list of navigation links for the navbar
export function getNavList(setOpenNav) {
  // Define the list of navigation items with label and destination route
  const navItems = [
    { label: "Inici", to: "/home" },
    { label: "About", to: "/about" },
    { label: "Contacte", to: "/contact" },
  ];

  // Return the JSX list of nav links as an unordered list
  return (
    <ul className={styles.navbarUtilsNavList}>
      {navItems.map((item) => (
        <Typography
          as="li" // Each item is rendered as a <li> element
          key={item.to} // Unique key for React rendering
          className={`${styles.navbarUtilsNavItem} ${styles.navbarUtilsTextBlueGray}`}
        >
          <NavLink
            to={item.to} // Route to navigate to
            className={({ isActive }) =>
              `${styles.navbarUtilsNavLink} ${styles.navbarUtilsNavLarge} ${
                isActive ? styles.navbarUtilsNavLinkActive : ""
              }`
            }
            onClick={() => setOpenNav(false)} // Close the mobile nav menu on click
          >
            {item.label} {/* Display the nav label (e.g. Inici, About...) */}
          </NavLink>
        </Typography>
      ))}
    </ul>
  );
}




// Returns login/logout buttons depending on user authentication status --> TODO: add login/signup buttons for unauthenticated users
export function getAuthButtons(isAuthenticated, setIsAuthenticated, navigate) {
  // Funció per fer logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/home");
  };

  if (isAuthenticated) {
    // Si l'usuari està autenticat, mostra botons de compte i logout
    return (
      <>
        <Button variant="text" size="sm">
          <NavLink to="/account" className={styles.navbarUtilsNavLinkHover}>
            Mi cuenta
          </NavLink>
        </Button>

        <Button variant="gradient" size="sm" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </>
    );
  }

  // Si NO està autenticat, aquí podríem mostrar botons de login/signup
  // 🟦 Aquesta part està comentada i es pot activar més endavant
  return (
    <>
      {/* 
      // 🔐 BOTONS PER USUARIS NO AUTENTICATS (activables més endavant)

      <Button variant="text" size="sm">
        <NavLink to="/login" className={styles.navbarUtilsNavLinkHover}>
          Inicia sessió
        </NavLink>
      </Button>

      <Button variant="gradient" size="sm">
        <NavLink to="/signup" className={styles.navbarUtilsNavLinkHover}>
          Registra't
        </NavLink>
      </Button>
      */}
    </>
  );
}
