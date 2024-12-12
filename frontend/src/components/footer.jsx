import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="company-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info Column */}
          <div className="footer-column company-info">
            
            <h1 className="company-description">
              Sapplinns
            </h1>
            <div className="contact-info">
              <div className="contact-item">
                <Mail className="icon" size={20} />
                <a href="mailto:hello@sapplinns.com" className="contact-link">
                  sapplinns@gmail.com
                </a>
              </div>
              <div className="contact-item">
                <Phone className="icon" size={20} />
                <span className="contact-text"> (+91) </span>
              </div>
              <div className="contact-item">
                <MapPin className="icon" size={20} />
                <span className="contact-text"> Address</span>
              </div>
            </div>
          </div>

          {/* Products Column */}
          <div className="footer-column">
            <h3>Products</h3>
            <ul>
              <li><a href="#software" className="footer-link">Software Solutions</a></li>
              <li><a href="#consulting" className="footer-link">Tech Consulting</a></li>
              <li><a href="#cloud" className="footer-link">Cloud Services</a></li>
              <li><a href="#ai" className="footer-link">AI Development</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li><a href="#blog" className="footer-link">Tech Blog</a></li>
              <li><a href="#whitepapers" className="footer-link">Whitepapers</a></li>
              <li><a href="#webinars" className="footer-link">Webinars</a></li>
              <li><a href="#case-studies" className="footer-link">Case Studies</a></li>
            </ul>
          </div>

          {/* Social Column */}
          <div className="footer-column social-column">
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <a 
                href="https://twitter.com/sapplinns" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon"
                aria-label="Twitter"
              >
                {/* Insert icon here */}
              </a>
              <a 
                href="https://linkedin.com/company/sapplinns" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon"
                aria-label="LinkedIn"
              >
                {/* Insert icon here */}
              </a>
              <a 
                href="https://github.com/sapplinns" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon"
                aria-label="GitHub"
              >
                {/* Insert icon here */}
              </a>
            </div>
            <div className="newsletter-signup">
              <h4 className="newsletter-title">
                Stay Innovated
              </h4>
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="newsletter-input"
                  aria-label="Email Input"
                />
                <button className="newsletter-button">
                  Enter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
