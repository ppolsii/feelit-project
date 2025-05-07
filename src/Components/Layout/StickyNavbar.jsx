// StickyNavbar.jsx - Top navigation bar shown on all pages

import React from "react";
import { Navbar } from "@material-tailwind/react"; // UI component for the navbar background

// Import helper functions to build the logo and navigation links
import { getLogoVariant, getNavList } from "./navbarUtils";

// Import styles from CSS module
import styles from "./Layout.module.css";

// Main StickyNavbar component (clean version without login/logout)
export default function StickyNavbar() {
  // Get the logo component
  const logo = getLogoVariant(0);

  // Get the list of navigation links (Home, About, Contact)
  const navList = getNavList(() => {}); // No need for mobile close handler

  return (
    // Main Navbar container (full width and sticky)
    <Navbar fullWidth className={styles.stickyNavbarContainer}>
      {/* Inner wrapper: arranges logo and nav links in one row */}
      <div className={styles.stickyNavbarInner}>

        {/* Left side: the logo */}
        <div className={styles.stickyNavbarLeft}>
          {logo}
        </div>

        {/* Center: navigation links */}
        <div className={styles.stickyNavbarCenter}>
          {navList}
        </div>

        {/* Right side: reserved for future login/logout buttons */}
        <div className={styles.stickyNavbarRight}>
          {/* Reservat per a futurs botons de login/logout */}
        </div>

      </div>
    </Navbar>
  );
}
