// src/components/Nav.tsx
import { ShoppingBag, Phone, MapPin, Menu, X, Clock, Award, Search } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ProfileModal from './ProfileModal';
import Support from './Support'; // Support form
import SendPackage from './SendPackage'; // SendPackage form
import './Nav.css';
import { useAuth } from '../context/authContext';

const Nav: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileImage] = useState<string | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState<string>('');

  // ✅ Modal states
  const [showSupportForm, setShowSupportForm] = useState(false);
  const [showSendPackageForm, setShowSendPackageForm] = useState(false);

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      {/* Top Info Bar */}
      <div className="nav-top-bar">
        <div className="nav-top-content">
          <div className="nav-info-items">
            <div className="nav-info-item">
              <Clock size={14} />
              <span>24/7 Service Available</span>
            </div>
            <div className="nav-info-item">
              <Award size={14} />
              <span>Trusted by 10,000+ Customers</span>
            </div>
          </div>
          <div className="nav-contact-items">
            <a href="tel:+15551234567" className="nav-contact-link">
              <Phone size={14} />
              <span>+1 (555) 123-4567</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="nav-container">
        <div className="nav-content">
          {/* Logo */}
          <div className="nav-logo">
            <div className="logo-badge">
              <ShoppingBag className="logo-icon" />
            </div>
            <div className="logo-text-wrapper">
              <span className="logo-text">QuickDeliver</span>
              <span className="logo-tagline">Express Delivery Service</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="nav-search-container">
            <form onSubmit={handleSearchSubmit} className="nav-search-form">
              <div className="search-input-wrapper">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for pizza, burgers, drinks, groceries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="nav-search-input"
                />
              </div>
              <button type="submit" className="nav-search-button">
                Search
              </button>
            </form>
          </div>

          {/* Navigation Links */}
          <ul className="nav-menu">
            <li className="nav-item">
              <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Services</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/track-order" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Track Order</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about-us" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact-us" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact Us</NavLink>
            </li>
          </ul>

          {/* Actions & Profile */}
          <div className="nav-actions">
            {/* Support Modal */}
            <button className="btn-secondary" onClick={() => setShowSupportForm(true)}>
              <Phone size={18} />
              <span>Support Us</span>
            </button>

            {/* Send Package Modal */}
            <button className="btn-primary" onClick={() => setShowSendPackageForm(true)}>
              <MapPin size={18} />
              <span>Send Package</span>
            </button>

            <div className="profile-section">
              {/* ... existing profile code ... */}
            </div>

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-search-container">
              <div className="search-input-wrapper">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mobile-search-input"
                />
              </div>
            </div>

            <ul className="mobile-menu-list">
              <li><NavLink to="/home" onClick={() => setMobileMenuOpen(false)} className="mobile-menu-link">Home</NavLink></li>
              <li><NavLink to="/services" onClick={() => setMobileMenuOpen(false)} className="mobile-menu-link">Services</NavLink></li>
              <li><NavLink to="/track-order" onClick={() => setMobileMenuOpen(false)} className="mobile-menu-link">Track Order</NavLink></li>
              <li><NavLink to="/about-us" onClick={() => setMobileMenuOpen(false)} className="mobile-menu-link">About Us</NavLink></li>
              <li><NavLink to="/contact-us" onClick={() => setMobileMenuOpen(false)} className="mobile-menu-link">Contact Us</NavLink></li>
            </ul>
          </div>
        )}
      </nav>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profileImage={profileImage}
      />

      {/* Support Modal */}
      {showSupportForm && (
        <div className="support-modal">
          <div className="modal-overlay" onClick={() => setShowSupportForm(false)}></div>
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowSupportForm(false)}>X</button>
            <Support />
          </div>
        </div>
      )}

      {/* Send Package Modal */}
      {showSendPackageForm && (
        <div className="support-modal">
          <div className="modal-overlay" onClick={() => setShowSendPackageForm(false)}></div>
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowSendPackageForm(false)}>X</button>
            <SendPackage />
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
