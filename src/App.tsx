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
import BecomeDriver from "./components/BecomeDriver";
import Auth from "./components/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/authContext";

// ✅ PublicRoute - Redirects logged-in users away from auth page
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, token } = useAuth();
  const isAuthenticated = !!user && !!token;

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const { user, token } = useAuth();
  const isAuthenticated = !!user && !!token;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation bar - only show for authenticated users */}
      {isAuthenticated && <Nav />}

      {/* ✅ Main content area */}
      <main className="flex-grow">
        <Routes>
          {/* ✅ Auth route - accessible only to non-logged-in users */}
          <Route
            path="/auth"
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            }
          />

          {/* ✅ Protected routes - require authentication */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Hero />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Hero />
              </ProtectedRoute>
            }
          />

          {/* Core pages */}
          <Route
            path="/services"
            element={
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            }
          />
          <Route
            path="/track-order"
            element={
              <ProtectedRoute>
                <Tracking />
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

          {/* ✅ New page for drivers */}
          <Route
            path="/become-driver"
            element={
              <ProtectedRoute>
                <BecomeDriver />
              </ProtectedRoute>
            }
          />

          {/* Fallback redirect - send to auth if not logged in */}
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </main>

      {/* Footer section - only show for authenticated users */}
      {isAuthenticated && <Footer />}
    </div>
  );
};

export default App;
