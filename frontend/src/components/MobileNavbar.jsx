// MobileNavbar.js
import React, { useState } from 'react';
import './MobileNavbar.css';
import logo from './images/logo.svg';
const MobileNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMobileMenuOpen(false); // Close menu on navigation
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="mobile-navbar">
      <img src={logo} className="mobile-logo" width="50px" height="50px" alt="Sapplinns" className="navbar-logo" />
      {/* Burger Menu Icon */}
      <button className="burger-menu" onClick={toggleMobileMenu}>
        ☰
      </button>

      {/* Mobile Links */}
      {isMobileMenuOpen && (
        <ul className="mobile-navbar-links">
          <li onClick={() => handleNavigation('/')}>Home</li>
          <li onClick={() => handleNavigation('/dashboard')}>Features</li>
          <li onClick={() => handleNavigation('/graph-analyser')}>Tools</li>
          <li onClick={() => handleNavigation('/stock-graph')}>Contact Us</li>
        </ul>
      )}
    </div>
  );
};

export default MobileNavbar;
