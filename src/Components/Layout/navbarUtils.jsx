// navbarUtils.js - Utility functions for building parts of the navbar

import React from "react";
import { Typography, Button } from "@material-tailwind/react"; // UI components
import { NavLink, Link } from "react-router-dom"; // Navigation components

// 🔷 Returns the logo JSX element depending on the selected style
export function getLogoVariant(style = 0) {
  const baseClass = "cursor-pointer py-1.5 font-bold text-2xl";
  switch (style) {
    case 1:
      // Style 1: "Feel" in dark color, "It" in blue
      return (
        <Typography as={Link} to="/home" className={baseClass}>
          <span className="text-blue-gray-900">Feel</span>
          <span className="text-blue-600">It</span>
        </Typography>
      );
    case 2:
      // Style 2: Bigger bold logo with italic "It"
      return (
        <Typography
          as={Link}
          to="/home"
          className="font-extrabold text-3xl tracking-tight text-blue-gray-900"
        >
          Feel<span className="text-blue-500 italic">It</span>
        </Typography>
      );
    default:
      // Default style: "Feel" in blue, "It" in dark gray
      return (
        <Typography as={Link} to="/home" className={baseClass}>
          <span className="text-blue-600">Feel</span>
          <span className="text-blue-gray-900">It</span>
        </Typography>
      );
  }
}

// 🔗 Returns a list of navigation links
export function getNavList(setOpenNav) {
  const navItems = [
    { label: "Inici", to: "/home" },
    { label: "About", to: "/about" },
    { label: "Contacte", to: "/contact" },
  ];

  return (
    <ul className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
      {navItems.map((item) => (
        <Typography
          as="li"
          key={item.to}
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              `flex items-center hover:text-blue-500 ${
                isActive ? "text-blue-600" : "text-blue-gray-700"
              }`
            }
            onClick={() => setOpenNav(false)} // Close menu when link is clicked
          >
            {item.label}
          </NavLink>
        </Typography>
      ))}
    </ul>
  );
}

// 🔐 Returns buttons for login/logout depending on authentication state
export function getAuthButtons(isAuthenticated, setIsAuthenticated, navigate) {
  // When user logs out
  const handleLogout = () => {
    setIsAuthenticated(false); // Remove auth state
    navigate("/home"); // Redirect to home
  };

  if (isAuthenticated) {
    // If user is logged in
    return (
      <>
        <Button variant="text" size="sm">
          <NavLink to="/account" className="hover:text-blue-500">
            Mi cuenta
          </NavLink>
        </Button>
        <Button variant="gradient" size="sm" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </>
    );
  }

  // If user is not logged in
  return (
    
    <>
    {/*
      <Button variant="text" size="sm">
        <NavLink className="hover:text-blue-500">Log In</NavLink>
      </Button>
      <Button variant="gradient" size="sm">
        <NavLink className="text-white">Sign In</NavLink>
      </Button>
    */}
    </>
  );
}
