// StickyNavbar.jsx - Top navigation bar shown on all pages

import React from "react";
import { Navbar } from "@material-tailwind/react";
import { NavLink, useLocation } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { useSearchContext } from "../../Context/SearchContext";
import { useLayoutContext } from "../../Context/LayoutContext"; 

import { getLogoVariant } from "./navbarUtils"; // getNavList no cal perquè l’hem reimplementat aquí
import styles from "./Layout.module.css";

export default function StickyNavbar() {
  const location = useLocation();
  const { layoutMode, setLayoutMode } = useLayoutContext(); // Accés al context global

  const firstLabel = layoutMode === "search" ? "Search" : "Inici";
  const firstLink = layoutMode === "search" ? "/search" : "/home";

  const navItems = [
    { label: firstLabel, to: firstLink },
    { label: "About", to: "/about" },
    { label: "Contacte", to: "/contact" },
  ];

  const logo = getLogoVariant(0, setLayoutMode); // En passar setLayoutMode, el logo actualitza l’estat

  return (
    <Navbar fullWidth className={styles.stickyNavbarContainer}>
      <div className={styles.stickyNavbarInner}>
        <div className={styles.stickyNavbarLeft}>
          {logo}
        </div>

        <div className={styles.stickyNavbarCenter}>
          <ul className={styles.navbarUtilsNavList}>
            {navItems.map((item) => (
              <Typography
                as="li"
                key={item.to}
                className={`${styles.navbarUtilsNavItem} ${styles.navbarUtilsTextBlueGray}`}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `${styles.navbarUtilsNavLink} ${styles.navbarUtilsNavLarge} ${
                      isActive ? styles.navbarUtilsNavLinkActive : ""
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </Typography>
            ))}
          </ul>
        </div>

        <div className={styles.stickyNavbarRight}>
          {/* Futurs botons de login/logout */}
        </div>
      </div>
    </Navbar>
  );
}
