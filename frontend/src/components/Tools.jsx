import React, { useState } from 'react';
import CropPrediction from './CropPrediction';
import './Tools.css';

function Tools() {
  const [activeTab, setActiveTab] = useState(0);
  const tabTitles = ["Predict Crop", "Health Monitoring"];

  return (
    <div className="landing">
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
        {activeTab === 1 && <div>About Crop Prediction...</div>}
      </div>
    </div>
  );
}

export default Tools;
