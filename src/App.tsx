// src/App.tsx
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Import Components
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Products from "./components/Products";
import BecomeDriver from "./components/BecomeDriver";
import Auth from "./components/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/authContext";

// PublicRoute - Redirects logged-in users away from auth page
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, token } = useAuth();
  const isAuthenticated = !!user && !!token;

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation bar - hide on auth page */}
      {!isAuthPage && <Nav />}

      {/* Main content area */}
      <main className="flex-grow">
        <Routes>
          {/* Auth route - accessible to everyone, but redirects if already logged in */}
          <Route
            path="/auth"
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            }
          />

          {/* Home page - PUBLIC - accessible to everyone */}
          <Route path="/" element={<Hero />} />
          <Route path="/home" element={<Hero />} />

          {/* ALL OTHER PAGES - PROTECTED - require login to access */}
          <Route
            path="/services"
            element={
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about-us"
            element={
              <ProtectedRoute>
                <AboutUs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact-us"
            element={
              <ProtectedRoute>
                <ContactUs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/become-driver"
            element={
              <ProtectedRoute>
                <BecomeDriver />
              </ProtectedRoute>
            }
          />

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer section - hide on auth page */}
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default App;
