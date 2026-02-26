// src/components/Nav.tsx
import { Phone, MapPin, Menu, X, Clock, Award, Search, ChevronDown, User, HelpCircle, Package, Home, Info, Mail } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
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
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  // Modal states
  const [showSupportForm, setShowSupportForm] = useState(false);
  const [showSendPackageForm, setShowSendPackageForm] = useState(false);

// Locations available
  const locations = ['Rwamishana', 'Kampala', 'Nairobi', 'Kigali', 'Dar es Salaam'];
  const [selectedLocation, setSelectedLocation] = useState(() => {
    const saved = localStorage.getItem('selectedLocation');
    return saved || 'Rwamishana';
  });

  // Save location to localStorage when it changes
  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    localStorage.setItem('selectedLocation', location);
  };

  // Stats
  const stats = {
    services: '2,477',
    customers: '10,000+'
  };

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchSuggestions(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      // Save to recent searches
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowSearchSuggestions(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const popularSearches = ['Pizza', 'Burgers', 'Groceries', 'Electronics', 'Fashion'];

  return (
    <>
      {/* Top Info Bar */}
      <div className="nav-top-bar">
        <div className="nav-top-content">
          <div className="nav-info-items">
            <div className="nav-info-item">
              <Clock size={14} />
              <span>{stats.services} Services Available</span>
            </div>
            <div className="nav-info-item">
              <Award size={14} />
              <span>Trusted by {stats.customers} Customers</span>
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
          <div className="nav-logo" onClick={() => navigate('/')}>
            <img 
              src="https://logo.com/image-cdn/images/kts928pd/production/4fa80ce406bb89b67ed5090cf477e2eeb89e0394-377x386.png?w=1080&q=72&fm=webp" 
              alt="Deliveries Easy" 
              className="logo-image"
            />
            <div className="logo-text-wrapper">
              <span className="logo-text">Deliveries Easy</span>
              <span className="logo-tagline">EXPRESS DELIVERY SERVICE</span>
            </div>
          </div>

          {/* Location Selector */}
          <div className="location-selector" ref={locationRef}>
            <button 
              className="location-button"
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            >
              <MapPin size={18} />
              <span>{selectedLocation}</span>
              <ChevronDown size={16} className={`chevron ${showLocationDropdown ? 'rotated' : ''}`} />
            </button>
            
{showLocationDropdown && (
              <div className="location-dropdown">
                {locations.map(loc => (
                  <button
                    key={loc}
                    className={`location-option ${loc === selectedLocation ? 'active' : ''}`}
                    onClick={() => {
                      handleLocationChange(loc);
                      setShowLocationDropdown(false);
                    }}
                  >
                    <MapPin size={16} />
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Enhanced Search Bar with Suggestions */}
          <div className="nav-search-container" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="nav-search-form">
              <div className="search-input-wrapper">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for pizza, burgers, drinks, groceries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSearchSuggestions(true)}
                  className="nav-search-input"
                />
              </div>
              <button type="submit" className="nav-search-button">
                Search
              </button>
            </form>

            {/* Search Suggestions Dropdown */}
            {showSearchSuggestions && (
              <div className="search-suggestions">
                {recentSearches.length > 0 && (
                  <div className="suggestion-section">
                    <div className="suggestion-header">Recent Searches</div>
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        className="suggestion-item"
                        onClick={() => {
                          setSearchQuery(search);
                          handleSearchSubmit({ preventDefault: () => {} } as React.FormEvent);
                        }}
                      >
                        <Clock size={14} />
                        {search}
                      </button>
                    ))}
                  </div>
                )}
                
                <div className="suggestion-section">
                  <div className="suggestion-header">Popular Searches</div>
                  <div className="popular-tags">
                    {popularSearches.map((item, index) => (
                      <button
                        key={index}
                        className="popular-tag"
                        onClick={() => {
                          setSearchQuery(item);
                          handleSearchSubmit({ preventDefault: () => {} } as React.FormEvent);
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links - VISIBLE FOR ALL USERS */}
          <ul className="nav-menu">
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <Home size={18} />
                <span>Home</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <Package size={18} />
                <span>Services</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about-us" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <Info size={18} />
                <span>About</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact-us" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <Mail size={18} />
                <span>Contact</span>
              </NavLink>
            </li>
          </ul>

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
                  <HelpCircle size={18} />
                  <span>Support</span>
                </button>

                {/* Send Package Modal */}
                <button className="btn-primary" onClick={() => setShowSendPackageForm(true)}>
                  <Package size={18} />
                  <span>Send Package</span>
                </button>

                {/* Profile / Logout */}
                <div className="profile-section">
                  <button className="profile-button" onClick={() => setShowProfileModal(true)}>
                    <User size={18} />
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

        {/* Enhanced Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            {/* Mobile Location */}
            <div className="mobile-location">
              <MapPin size={18} />
<select 
                value={selectedLocation}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="mobile-location-select"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Mobile Search */}
            <div className="mobile-search-container">
              <div className="search-input-wrapper">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
                  className="mobile-search-input"
                />
              </div>
            </div>

            {/* Mobile Menu Items with Icons */}
            <ul className="mobile-menu-list">
              {!isAuthenticated ? (
                <>
                  <li>
                    <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="mobile-menu-link">
                      <Home size={18} />
                      <span>Home</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/auth" onClick={() => setMobileMenuOpen(false)} className="mobile-menu-link">
                      <User size={18} />
                      <span>Sign In</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/auth" onClick={() => setMobileMenuOpen(false)} className="mobile-menu-link">
                      <User size={18} />
                      <span>Sign Up</span>
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/home" onClick={() => setMobileMenuOpen(false)} className="mobile-menu-link">
                      <Home size={18} />
                      <span>Home</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/services" onClick={() => setMobileMenuOpen(false)} className="mobile-menu-link">
                      <Package size={18} />
                      <span>Services</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about-us" onClick={() => setMobileMenuOpen(false)} className="mobile-menu-link">
                      <Info size={18} />
                      <span>About</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact-us" onClick={() => setMobileMenuOpen(false)} className="mobile-menu-link">
                      <Mail size={18} />
                      <span>Contact</span>
                    </NavLink>
                  </li>
                  <li className="mobile-divider"></li>
                  <li>
                    <button onClick={() => { setShowSupportForm(true); setMobileMenuOpen(false); }} className="mobile-menu-link">
                      <HelpCircle size={18} />
                      <span>Support</span>
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { setShowSendPackageForm(true); setMobileMenuOpen(false); }} className="mobile-menu-link">
                      <Package size={18} />
                      <span>Send Package</span>
                    </button>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="mobile-menu-link logout">
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>

            {/* Mobile Stats */}
            <div className="mobile-stats">
              <div className="mobile-stat-item">
                <span className="stat-value">{stats.services}</span>
                <span className="stat-label">Services</span>
              </div>
              <div className="mobile-stat-item">
                <span className="stat-value">{stats.customers}</span>
                <span className="stat-label">Customers</span>
              </div>
            </div>
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
            <button className="close-btn" onClick={() => setShowSupportForm(false)}>×</button>
            <Support />
          </div>
        </div>
      )}

      {/* Send Package Modal */}
      {showSendPackageForm && (
        <div className="support-modal">
          <div className="modal-overlay" onClick={() => setShowSendPackageForm(false)}></div>
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowSendPackageForm(false)}>×</button>
            <SendPackage />
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;