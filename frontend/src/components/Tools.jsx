import React, { useState } from 'react';
import CropPrediction from './CropPrediction';
import './Tools.css';
import HealthMonitoring from './HealthMonitoring';

function Tools() {
  const [activeTab, setActiveTab] = useState(0);
  const tabTitles = ["Predict Crop", "Health Monitoring"];

  return (
    <div className="landing">
      <div className="features-container">
        <h1 className="features-heading">Features We Offer</h1>
        <h3 className="features-subhead">Empowering You with Smart Tools for Thriving Crop Health!</h3>
      </div>
      <div className="tab-buttons">
        {tabTitles.map((title, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {title}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {activeTab === 0 && <CropPrediction />}
        {activeTab === 1 && <HealthMonitoring />}
      </div>
    </div>
  );
}

export default Tools;
