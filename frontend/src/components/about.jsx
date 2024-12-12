import React from "react";
import "./about.css";
import { FaLeaf, FaMicroscope, FaChartLine } from "react-icons/fa";
import flowchart1 from "./images/flowchart1.png";
const AboutUs = () => {
  return (
    <div className="feature">
      <div className="about-us">
        <img
          src={flowchart1}
          alt="About Us"
          className="about-us-image"
          width = "1090px"
          height="1500px"
        />
        
      </div>
      <div className="sapplinns-info">
        <h2 className="title">How Sapplinns Works</h2>
        <div className="info-cards">
          <div className="card">
            <FaLeaf className="icon" />
            <h3>Soil Health Monitoring</h3>
            <p>
              Sapplinns uses advanced sensors to continuously track key soil
              parameters like moisture, pH, and nutrient levels. This real-time
              data allows farmers to actively manage soil health and create
              ideal conditions for optimal crop growth.
            </p>
          </div>
          <div className="card">
            <FaMicroscope className="icon" />
            <h3>Nutrient Analysis & Recommendations</h3>
            <p>
              By analyzing the soil’s nutrient composition, Sapplinns provides
              personalized fertilization advice. This helps farmers choose the
              best crops suited to their soil's nutrient levels, reducing waste
              and improving crop productivity.
            </p>
          </div>
          <div className="card">
            <FaChartLine className="icon" />
            <h3>Predictive Crop Analysis</h3>
            <p>
              Using AI and historical data, Sapplinns forecasts crop yields
              based on soil nutrients and field performance. This enables
              farmers to plan their harvests more effectively and maximize
              returns on their farming efforts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
