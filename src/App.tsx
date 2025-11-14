// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// ✅ Import Components
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Tracking from "./components/Tracking";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Products from "./components/Products";
import BecomeDriver from "./components/BecomeDriver"; // ✅ Newly added component

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ✅ Navigation bar */}
      <Nav />

      {/* ✅ Main content area */}
      <main className="flex-grow">
        <Routes>
          {/* Home routes */}
          <Route path="/" element={<Hero />} />
          <Route path="/home" element={<Hero />} />

          {/* Core pages */}
          <Route path="/services" element={<Services />} />
          <Route path="/track-order" element={<Tracking />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/products" element={<Products />} />

          {/* ✅ New page for drivers */}
          <Route path="/become-driver" element={<BecomeDriver />} />

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* ✅ Footer section */}
      <Footer />
    </div>
  );
};

export default App;
