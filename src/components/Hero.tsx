// src/components/Hero.tsx
import React from "react";
import { Package, Truck, Clock, MapPin, Zap, User, UserPlus, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import "./Hero.css";

const Hero: React.FC = () => {
  const { user, token, logout } = useAuth();
  const isAuthenticated = !!user && !!token;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <section className="hero-section">
      <div className="hero-content">

        {/* HERO TEXT */}
        <div className="hero-text">
          {/* UPDATED: Hero Title with two lines and big styling */}
          <h1 className="hero-title">
            <span className="fast-reliable">Fast & Reliable</span>
            <span className="boda-delivery">Boda Boda Delivery</span>
          </h1>
          
          <p className="hero-description">
            Experience lightning-fast motorcycle delivery through city traffic. 
            Track in real-time, schedule instant pickups, and enjoy peace of mind 
            with our secure boda boda network.
          </p>

          {/* HERO BUTTONS - CONDITIONAL RENDERING */}
          <div className="hero-buttons">
            {/* Show different buttons based on authentication status */}
            {!isAuthenticated ? (
              /* NOT AUTHENTICATED - Show Sign In and Sign Up */
              <>
                <Link to="/auth" className="hero-btn-secondary">
                  <User size={20} /> <span>Sign In</span>
                </Link>
                <Link to="/auth" className="hero-btn-primary">
                  <UserPlus size={20} /> <span>Sign Up</span>
                </Link>
              </>
            ) : (
              /* AUTHENTICATED - Show Welcome Message and Logout */
              <div className="hero-welcome">
                <span className="welcome-text">Welcome back, {user?.name || 'User'}!</span>
                <button onClick={handleLogout} className="hero-btn-logout">
                  <LogOut size={20} /> <span>Logout</span>
                </button>
              </div>
            )}
            
            {/* These buttons show for ALL users regardless of auth status */}
            <Link to="/track-order" className="hero-btn-secondary">
              <MapPin size={20} /> <span>Track Delivery</span>
            </Link>
          </div>

          {/* HERO STATS */}
          <div className="hero-stats">
            <div className="hero-stat">
              <h3>15-30</h3>
              <p>Minute Delivery</p>
            </div>
            <div className="hero-stat">
              <h3>70K+</h3>
              <p>Deliveries Made</p>
            </div>
            <div className="hero-stat">
              <h3>24/7</h3>
              <p>Boda Service</p>
            </div>
          </div>
        </div>

        {/* HERO VISUAL */}
        <div className="hero-visual">
          <div className="boda-boda-scene">
            <div className="road">
              <div className="road-line"></div>
            </div>
            <div className="boda-boda">
              <img
                src="https://www.shutterstock.com/image-photo/help-me-create-2-delivery-260nw-2679022615.jpg"
                alt="Motorcycle Delivery Rider"
                className="boda-image"
              />
            </div>
          </div>

          {/* FEATURE CARDS */}
          <div className="hero-card">
            <div className="hero-card-icon"><Truck size={32} /></div>
            <h3>Express Boda</h3>
            <p>Same-day delivery available</p>
          </div>
          <div className="hero-card">
            <div className="hero-card-icon"><Clock size={32} /></div>
            <h3>Real-Time Tracking</h3>
            <p>Watch your boda move live</p>
          </div>
          <div className="hero-card">
            <div className="hero-card-icon"><Package size={32} /></div>
            <h3>Secure Handling</h3>
            <p>Your packages are safe with us</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;