import React, { useState } from "react";
// import axios from "axios";
import { Mail, MapPin, Phone } from "lucide-react";
import "./footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const SPREADSHEET_ID = "1UF0MqggkcOFl73d1hPo7BvNFDCHP6LYKqcgicrE5zfE"; // Replace with your actual Google Sheet ID
  const API_KEY = "AIzaSyAS1I3dTFtW6BcJUvXF7ybS8ZFdyP9Tfug"; // Replace with your Google Sheets API key
  const RANGE = "Sheet1!A:B"; // The range where the data will be saved (can change)

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if the fields are filled
    if (!email || !contact) {
      setError("Both email and contact number are required.");
      return;
    }

    setLoading(true);
    setError("");

    // Prepare the data to send to Google Sheets
    const data = {
      values: [[email, contact]],
    };

    // Construct the URL for Google Sheets API to append data
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueInputOption=RAW&key=${API_KEY}`;

    try {
      // Send data to Google Sheets API
      const response = await fetch(url, {
        method: "PUT", // Use PUT method to update the values in the range
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Data submitted successfully!");
        setEmail("");
        setContact("");
      } else {
        const result = await response.json();
        setError(result.error.message || "Failed to submit the data.");
      }
    } catch (error) {
      setError("Error submitting the data: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <footer className="company-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info Column */}
          <div className="footer-column company-info">
            <h1 className="company-description">Sapplinns</h1>
            <div className="contact-info">
              <div className="contact-item">
                <Mail className="icon" size={20} />
                <a href="mailto:hello@sapplinns.com" className="contact-link">
                  sapplinns@gmail.com
                </a>
              </div>
              <div className="contact-item">
                <Phone className="icon" size={20} />
                <span className="contact-text"> (+91) 8447512857 </span>
              </div>
              <div className="contact-item">
                <MapPin className="icon" size={20} />
                <span className="contact-text">
                  {" "}
                  High tech machine tools nawlu colony faridabad
                </span>
              </div>
            </div>
          </div>

          {/* Products Column */}
          <div className="footer-column">
            <h3>Products</h3>
            <ul>
              <li>
                <a href="#software" className="footer-link">
                  Software Solutions
                </a>
              </li>
              <li>
                <a href="#consulting" className="footer-link">
                  Tech Consulting
                </a>
              </li>
              <li>
                <a href="#cloud" className="footer-link">
                  Cloud Services
                </a>
              </li>
              <li>
                <a href="#ai" className="footer-link">
                  AI Development
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li>
                <a href="#blog" className="footer-link">
                  Tech Blog
                </a>
              </li>
              <li>
                <a href="#whitepapers" className="footer-link">
                  Whitepapers
                </a>
              </li>
              <li>
                <a href="#webinars" className="footer-link">
                  Webinars
                </a>
              </li>
              <li>
                <a href="#case-studies" className="footer-link">
                  Case Studies
                </a>
              </li>
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
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
                aria-label="Email Input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
              />
              <input
                type="tel"
                placeholder="Enter your contact number"
                className="newsletter-input"
                aria-label="Contact Number Input"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
              />
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button
                className="newsletter-button"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
