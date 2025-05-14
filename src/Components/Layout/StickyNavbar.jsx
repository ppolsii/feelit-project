import React from "react";
import { Navbar } from "@material-tailwind/react";
import { NavLink, useLocation } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { useSearchContext } from "../../Context/SearchContext";
import { useLayoutContext } from "../../Context/LayoutContext";

import { getLogoVariant } from "./navbarUtils";
import styles from "./Layout.module.css";

// 🎞️ Animació
import { motion, AnimatePresence } from "framer-motion";

export default function StickyNavbar() {
  const location = useLocation();
  const { layoutMode, setLayoutMode } = useLayoutContext();

  const firstLabel = layoutMode === "search" ? "Search" : "Home";
  const firstLink = layoutMode === "search" ? "/search" : "/home";

  const navItems = [
    { label: firstLabel, to: firstLink },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  const logo = getLogoVariant(0, setLayoutMode);

  return (
    <Navbar fullWidth className={styles.stickyNavbarContainer}>
      <div className={styles.stickyNavbarInner}>
        <div className={styles.stickyNavbarLeft}>
          {logo}
        </div>

        <div className={styles.stickyNavbarCenter}>
          <ul className={styles.navbarUtilsNavList}>
            {navItems.map((item, index) => (
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
                  {/* Animació només al primer ítem */}
                  {index === 0 ? (
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={item.label}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.25 }}
                      >
                        {item.label}
                      </motion.span>
                    </AnimatePresence>
                  ) : (
                    item.label
                  )}
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
