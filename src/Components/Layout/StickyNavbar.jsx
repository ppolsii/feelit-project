// StickyNavbar.jsx - This is the top navigation bar shown on all pages

import React, { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react"; // Tailwind UI components
import { NavLink, useNavigate, Link } from "react-router-dom"; // Routing helpers

// Import helper functions to generate navbar content
import {
  getLogoVariant,
  getNavList,
  getAuthButtons,
} from "./navbarUtils";

// Import icons for opening and closing the mobile menu
import { MenuIcon, CloseIcon } from "./NavIcons";

export function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false); // Tracks if mobile menu is open
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Auth state (mock)
  const navigate = useNavigate();

  // 🖥️ Auto-close the mobile menu when the window gets wide (>=768px)
  useEffect(() => {
    const handler = () => window.innerWidth >= 768 && setOpenNav(false);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Get dynamic elements from helper functions
  const logo = getLogoVariant(0); // Default logo style
  const navList = getNavList(setOpenNav); // Links for "Inici", "About", "Contacte"
  const authButtons = getAuthButtons(isAuthenticated, setIsAuthenticated, navigate); // Log in/out buttons

  return (
    <Navbar
      fullWidth
      className="sticky top-0 z-10 rounded-none px-4 py-4 md:px-8 md:py-6"
    >
      <div className="container mx-auto flex items-center justify-between relative">
        {/* Left: Logo */}
        {logo}

        {/* Center: Menu links (desktop only) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {navList}
        </div>

        {/* Right: Auth buttons + menu icon (only shows on mobile) */}
        <div className="flex items-center gap-x-2 md:ml-auto">
          <div className="hidden md:flex">{authButtons}</div>
          <IconButton
            variant="text"
            aria-label={openNav ? "Tancar menú" : "Obrir menú"}
            className="h-6 w-6 text-inherit md:hidden"
            onClick={() => setOpenNav(!openNav)} // Toggle mobile menu
          >
            {openNav ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>
      </div>

      {/* Mobile menu collapsible content */}
      <Collapse open={openNav} className="md:hidden mt-2">
        <div className="flex flex-col gap-4">
          {navList}
          {authButtons}
        </div>
      </Collapse>
    </Navbar>
  );
}
