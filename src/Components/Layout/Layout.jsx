// Layout.jsx - This component wraps every page and shows the navbar on top

import React from "react";
import { Outlet } from "react-router-dom"; // Used to render the current page inside the layout
import { StickyNavbar } from "./StickyNavbar"; // Top navigation bar component

export default function Layout() {
  return (
    <>
      {/* The navigation bar always stays at the top */}
      <StickyNavbar />

      {/* The page content will be rendered here */}
      <div>
        <Outlet />
      </div>
    </>
  );
}