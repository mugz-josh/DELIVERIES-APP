import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Send, Clock, Truck, Shield, Star, Package, Users, Award } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      {/* Animated Shimmer Line */}
      <div className="footer-shimmer"></div>

      {/* Newsletter Section */}
      <div className="footer-newsletter">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h3> Get Special Offers!</h3>
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

      {/* Stats Section */}
      <div className="footer-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <Package size={24} />
          </div>
          <div className="stat-number">50K+</div>
          <div className="stat-label">Packages Delivered</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-number">25K+</div>
          <div className="stat-label">Happy Customers</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Truck size={24} />
          </div>
          <div className="stat-number">99.9%</div>
          <div className="stat-label">On-Time Delivery</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Award size={24} />
          </div>
          <div className="stat-number">15+</div>
          <div className="stat-label">Years Experience</div>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section footer-brand">
            <div className="footer-logo">
              <img 
                src="https://logo.com/image-cdn/images/kts928pd/production/4fa80ce406bb89b67ed5090cf477e2eeb89e0394-377x386.png?w=1080&q=72&fm=webp" 
                alt="Deliveries Easy" 
                className="footer-logo-image"
              />
              <div className="logo-text-wrapper">
                <span className="footer-logo-text">Deliveries Easy</span>
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
            <div className="star-rating">
              <Star size={18} fill="#f39c12" color="#f39c12" />
              <Star size={18} fill="#f39c12" color="#f39c12" />
              <Star size={18} fill="#f39c12" color="#f39c12" />
              <Star size={18} fill="#f39c12" color="#f39c12" />
              <Star size={18} fill="#f39c12" color="#f39c12" />
            </div>
            <span>5.0/5 (10k+ Reviews)</span>
          </div>
        </div>

        {/* App Download Section */}
        <div className="footer-apps">
          <div className="apps-content">
            <div className="apps-text">
              <h4>📱 Download Our App</h4>
              <p>Get the best delivery experience on your mobile device</p>
            </div>
            <div className="app-buttons">
              <a href="#app-store" className="app-btn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="app-btn-text">
                  <span>Download on the</span>
                  <span>App Store</span>
                </div>
              </a>
              <a href="#google-play" className="app-btn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.634z"/>
                </svg>
                <div className="app-btn-text">
                  <span>Get it on</span>
                  <span>Google Play</span>
                </div>
              </a>
            </div>
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
