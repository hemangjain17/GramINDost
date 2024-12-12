import React from 'react';
import MobileNavbar from './MobileNavbar';
import './Navbar.css';
import logo from './images/logo.png';

const Navbar = () => {
  const handleNavigation = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="navbar">
        <ul className="navbar-links">
          <li onClick={() => handleNavigation('home')}>Home</li>
          <li onClick={() => handleNavigation('about')}>About Us</li>
          <img src={logo} width="50px" height="50px" alt="Sapplinns" className="navbar-logo" />
          <li onClick={() => handleNavigation('features')}>Features</li>
          <li onClick={() => handleNavigation('contact')}>Contact Us</li>
        </ul>
      </div>

      {/* Mobile Navbar */}
      <MobileNavbar />
    </>
  );
};

export default Navbar;
