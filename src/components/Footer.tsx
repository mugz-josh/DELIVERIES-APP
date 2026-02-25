import { ShoppingBag, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Send, Clock, Truck, Shield, Star } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      {/* Newsletter Section */}
      <div className="footer-newsletter">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h3>🚀 Get Special Offers!</h3>
            <p>Subscribe to receive exclusive deals and updates directly to your inbox</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required 
            />
            <button type="submit">
              <Send size={18} />
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section footer-brand">
            <div className="footer-logo">
              <div className="logo-badge">
                <ShoppingBag className="footer-logo-icon" />
              </div>
              <div className="logo-text-wrapper">
                <span className="footer-logo-text">QuickDeliver</span>
                <span className="footer-logo-tagline">Swift & Secure</span>
              </div>
            </div>
            <p className="footer-description">
              Fast, reliable, and secure delivery services at your fingertips.
              We deliver your packages with care and precision.
            </p>
            
            {/* Feature Items */}
            <div className="footer-features">
              <div className="feature-item">
                <Truck size={16} />
                <span>Fast Delivery</span>
              </div>
              <div className="feature-item">
                <Shield size={16} />
                <span>Secure</span>
              </div>
              <div className="feature-item">
                <Clock size={16} />
                <span>24/7 Support</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="footer-social">
              <a href="https://facebook.com" className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><NavLink to="/home">Home</NavLink></li>
              <li><NavLink to="/services">Our Services</NavLink></li>
              <li><NavLink to="/track-order">Track Order</NavLink></li>
              <li><NavLink to="/products">Products</NavLink></li>
              <li><NavLink to="/about-us">About Us</NavLink></li>
              <li><NavLink to="/contact-us">Contact</NavLink></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3 className="footer-title">Our Services</h3>
            <ul className="footer-links">
              <li><a href="#express">Express Delivery</a></li>
              <li><a href="#standard">Standard Delivery</a></li>
              <li><a href="#international">International Shipping</a></li>
              <li><a href="#bulk">Bulk Orders</a></li>
              <li><a href="#same-day">Same Day Delivery</a></li>
              <li><a href="#warehousing">Warehousing</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <ul className="footer-contact">
              <li>
                <div className="contact-icon">
                  <MapPin size={18} />
                </div>
                <div className="contact-text">
                  <span className="contact-label">Address</span>
                  <span>123 Delivery Street, City, Country</span>
                </div>
              </li>
              <li>
                <a href="tel:+15551234567" className="contact-link">
                  <div className="contact-icon">
                    <Phone size={18} />
                  </div>
                  <div className="contact-text">
                    <span className="contact-label">Phone</span>
                    <span>+1 (555) 123-4567</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:support@quickdeliver.com" className="contact-link">
                  <div className="contact-icon">
                    <Mail size={18} />
                  </div>
                  <div className="contact-text">
                    <span className="contact-label">Email</span>
                    <span>support@quickdeliver.com</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Working Hours */}
        <div className="footer-hours">
          <div className="hours-content">
            <Clock size={24} />
            <div className="hours-text">
              <strong>Working Hours</strong>
              <span>24/7 Customer Support Available</span>
            </div>
          </div>
          <div className="rating">
            <Star size={18} fill="#f39c12" color="#f39c12" />
            <Star size={18} fill="#f39c12" color="#f39c12" />
            <Star size={18} fill="#f39c12" color="#f39c12" />
            <Star size={18} fill="#f39c12" color="#f39c12" />
            <Star size={18} fill="#f39c12" color="#f39c12" />
            <span>5.0/5 (10k+ Reviews)</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© {currentYear} <strong>QuickDeliver</strong>. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <span className="separator">|</span>
            <a href="#terms">Terms of Service</a>
            <span className="separator">|</span>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
