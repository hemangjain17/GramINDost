import React from 'react';
import './Navbar.css';
// import Dashboard from './dashbaord';
// import stockGraph from './stockgraph';

const Navbar = () => {
  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <div className="navbar">
      <ul className="navbar-links">
        <li onClick={() => handleNavigation('/')}>Home</li>
        <li onClick={() => handleNavigation('/dashboard')}>Features</li>
        <li><h2>Sapplinns</h2></li>
        <li onClick={() => handleNavigation('/graph-analyser')}>Tools</li>
        <li onClick={() => handleNavigation('/stock-graph')}>Contact Us</li>
      </ul>
      {/* <div className="button">
        <button className="navbar-button">Sign In</button>
        <button className="navbar-button">Sign Up</button>
      </div> */}
    </div>
  );
};

export default Navbar;
