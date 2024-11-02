import React, { useState } from 'react';
import './MobileNavbar.css';
import logo from './images/logo.svg'; // Assuming logo is still used in mobile

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsOpen(false); // Close menu after navigation
  };

  return (
    <div className="mobile-navbar">
      <div className="mobile-navbar-header">
        <img src={logo} alt="Sapplinns" className="mobile-navbar-logo" />
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>
      {isOpen && (
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
