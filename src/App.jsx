import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";

//Pages
import Layout  from "./Components/Layout/Layout";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import Contact from "./Pages/Contact";
import About from "./Pages/About"; 
import NotFound from "./Pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />} />

        <Route path="home" element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>

  )
}
