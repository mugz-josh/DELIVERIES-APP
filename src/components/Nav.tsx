// src/components/Nav.tsx
import { Phone, MapPin, Menu, X, Clock, Award, Search } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ProfileModal from './ProfileModal';
import Support from './Support';
import SendPackage from './SendPackage';
import './Nav.css';
import { useAuth } from '../context/authContext';

const Nav: React.FC = () => {
  const { user, token, logout } = useAuth();
  const isAuthenticated = !!user && !!token;
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileImage] = useState<string | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal states
  const [showSupportForm, setShowSupportForm] = useState(false);
  const [showSendPackageForm, setShowSendPackageForm] = useState(false);

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
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
            <img 
              src="https://logo.com/image-cdn/images/kts928pd/production/4fa80ce406bb89b67ed5090cf477e2eeb89e0394-377x386.png?w=1080&q=72&fm=webp" 
              alt="Deliveries Easy" 
              className="logo-image"
            />
            <div className="logo-text-wrapper">
              <span className="logo-text">Deliveries Easy</span>
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

          {/* Navigation Links - Only show for authenticated users */}
          {isAuthenticated && (
            <ul className="nav-menu">
              <li className="nav-item">
                <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Services</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about-us" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact-us" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink>
              </li>
            </ul>
          )}

          {/* Actions & Profile */}
          <div className="nav-actions">
            {/* Sign In / Sign Up for non-authenticated users */}
            {!isAuthenticated ? (
              <>
                <NavLink to="/auth" className="btn-secondary">
                  Sign In
                </NavLink>
                <NavLink to="/auth" className="btn-primary">
                  Sign Up
                </NavLink>
              </>
            ) : (
              // Show these only for authenticated users
              <>
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

                {/* Profile / Logout */}
                <div className="profile-section">
                  <button className="profile-button" onClick={() => setShowProfileModal(true)}>
                    <span className="profile-name">{user?.name || 'User'}</span>
                  </button>
                  <button className="logout-button" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </>
            )}

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
              {/* For non-authenticated users - show only Home and Auth */}
              {!isAuthenticated ? (
                <>
                  <li><NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="mobile-menu-link">Home</NavLink></li>
                  <li><NavLink to="/auth" onClick={() => setMobileMenuOpen(false)} className="mobile-menu-link">Sign In</NavLink></li>
                  <li><NavLink to="/auth" onClick={() => setMobileMenuOpen(false)} className="mobile-menu-link">Sign Up</NavLink></li>
                </>
              ) : (
                // For authenticated users - show all links
                <>
                  <li><NavLink to="/home" onClick={() => setMobileMenuOpen(false)} className="mobile-menu-link">Home</NavLink></li>
                  <li><NavLink to="/services" onClick={() => setMobileMenuOpen(false)} className="mobile-menu-link">Services</NavLink></li>
                  <li><NavLink to="/about-us" onClick={() => setMobileMenuOpen(false)} className="mobile-menu-link">About</NavLink></li>
                  <li><NavLink to="/contact-us" onClick={() => setMobileMenuOpen(false)} className="mobile-menu-link">Contact</NavLink></li>
                  <li><button onClick={handleLogout} className="mobile-menu-link">Logout</button></li>
                </>
              )}
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
