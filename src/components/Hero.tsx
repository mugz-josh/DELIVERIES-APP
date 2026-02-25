// src/components/Hero.tsx
import React from "react";
import { Package, Truck, Clock, MapPin, Zap, User, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import "./Hero.css";

const Hero: React.FC = () => {
  const { user, token } = useAuth();
  const isAuthenticated = !!user && !!token;

  return (
    <section className="hero-section">
      <div className="hero-content">

        {/* HERO TEXT */}
        <div className="hero-text">
          <h1 className="hero-title">
            Fast & Reliable <span className="hero-highlight">Boda Boda Delivery</span>
          </h1>
          <p className="hero-description">
            Experience lightning-fast motorcycle delivery through city traffic. 
            Track in real-time, schedule instant pickups, and enjoy peace of mind 
            with our secure boda boda network.
          </p>

          {/* HERO BUTTONS - Sign In and Sign Up for ALL users (prominently displayed) */}
          <div className="hero-buttons" style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <Link to="/auth" className="hero-btn-secondary" style={{ padding: '14px 28px', fontSize: '1rem', fontWeight: 700, borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', background: '#f39c12', color: '#fff', border: '2px solid #f39c12' }}>
              <User size={20} /> <span>Sign In</span>
            </Link>
            <Link to="/auth" className="hero-btn-primary" style={{ padding: '14px 28px', fontSize: '1rem', fontWeight: 700, borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', background: '#e67e22', color: '#fff', border: '2px solid #e67e22' }}>
              <UserPlus size={20} /> <span>Sign Up</span>
            </Link>
            <a
              href="https://wa.me/256754316375?text=Hello!%20I%20want%20to%20place%20an%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-primary"
            >
              <Zap size={20} /> <span>Chat on WhatsApp</span>
            </a>
            <a href="/track-order" className="hero-btn-secondary">
              <MapPin size={20} /> <span>Track Delivery</span>
            </a>
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
