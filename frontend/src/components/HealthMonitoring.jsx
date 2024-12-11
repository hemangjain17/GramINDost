import React, { useState } from "react";
import axios from "axios";
import "./HealthMonitoring.css";

function HealthMonitoring() {
  const [healthInfo, setHealthInfo] = useState(null); // Store the health info as an object
  const [loading, setLoading] = useState(false);

  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [phValue, setPhValue] = useState("");
  const [humidity, setHumidity] = useState("");
  const [conductivity, setConductivity] = useState("");
  const [crop, setCrop] = useState("");
  const [temperature, setTemperature] = useState("");

  const handleHealthInfo = async () => {
    try {
      setLoading(true);
      if (
        !nitrogen ||
        !phosphorus ||
        !potassium ||
        !phValue ||
        !crop ||
        !humidity ||
        !conductivity
      ) {
        alert(
          "Please provide all values for N, P, K, Crop Grown on the Soil and pH."
        );
        setLoading(false);
        return;
      }

      // Post the soil data to the backend for health analysis
      const response = await axios.post("http://127.0.0.1:5000/health", {
        nitrogen,
        phosphorus,
        potassium,
        ph: phValue,
        crop,
        temperature,
        conductivity,
        humidity,
      });
      console.log(response.data);
      setHealthInfo(response.data); // Get health info directly from response
      setLoading(false);
    } catch (error) {
      setHealthInfo("Error occurred during prediction");
      setLoading(false);
    }
  };

  const renderHealthInfo = (data) => {
    if (typeof data === "object") {
      return (
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((key) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{renderHealthInfo(data[key])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      return <td>{data}</td>; // Return the value in a table cell
    }
  };

  return (
    <>
      <div className="crop-prediction">
        <div className="monitoring-head">Know Soil Health</div>
        <div className="input-container">
          <label>
            Nitrogen (N) <span> (in mg/L) : </span>
            <input
              type="number"
              value={nitrogen}
              onChange={(e) => setNitrogen(e.target.value)}
            />
          </label>
        </div>

        <div className="input-container">
          <label>
            Phosphorus (P) <span> (in mg/L) : </span>
            <input
              type="number"
              value={phosphorus}
              onChange={(e) => setPhosphorus(e.target.value)}
            />
          </label>
        </div>

        <div className="input-container">
          <label>
            Potassium (K) <span> (in mg/L) : </span>
            <input
              type="number"
              value={potassium}
              onChange={(e) => setPotassium(e.target.value)}
            />
          </label>
        </div>

        <div className="input-container">
          <label>
            pH Value <span> : </span>
            <input
              type="number"
              step="0.01"
              value={phValue}
              onChange={(e) => setPhValue(e.target.value)}
            />
          </label>
        </div>

        <div className="input-container">
          <label>
            Temperature <span>(&deg;C):</span>
            <input
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
            />
          </label>
        </div>

        <div className="input-container">
          <label>
            Humidity <span> (%) : </span>
            <input
              type="number"
              value={humidity}
              onChange={(e) => setHumidity(e.target.value)}
            />
          </label>
        </div>

        <div className="input-container">
          <label>
            Conductivity <span> (S/m) : </span>
            <input
              type="number"
              value={conductivity}
              onChange={(e) => setConductivity(e.target.value)}
            />
          </label>
        </div>

        <div className="input-container">
          <label>
            Crop Grown On The Soil <span> : </span>
            <input
              type="text"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
            />
          </label>
        </div>

        <button
          className="button"
          onClick={handleHealthInfo}
          disabled={loading}
        >
          {loading ? "Fetching Details..." : "Get Details"}
        </button>
      </div>
      <div className="crop-prediction-2">
        {loading && !healthInfo && (
          <div>
            <p>Loading...</p>
          </div>
        )}

        {healthInfo && healthInfo !== "Error occurred during prediction" && (
          <div>
            <h className="monitoring-head">Health Information:</h>
            {renderHealthInfo(healthInfo)}
          </div>
        )}

        {healthInfo === "" && !loading && (
          <div>
            <p>
              Please enter the soil details and click "Get Details" to get
              health information.
            </p>
          </div>
        )}

        {healthInfo === "Error occurred during prediction" && (
          <div>
            <p>Error occurred during generation. Please try again.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default HealthMonitoring;
