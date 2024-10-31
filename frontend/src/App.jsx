import react from 'react';
import Tools from './components/Tools';
import Landing from './components/Landing';

function App() {
  return (
    <>
      
      {/* <div className="App"> */}
        <Landing />
        
        <Tools />
      {/* </div> */}
    </>
  );
}
export default App;








// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [predictedCropIdx, setPredictedCropIdx] = useState(null);
//   const [responseMessage, setResponseMessage] = useState(''); // To store the full response from the backend
//   const [cropInfo, setCropInfo] = useState('');
//   const [loading, setLoading] = useState(false);

//   // New states for N, P, K, and pH inputs
//   const [nitrogen, setNitrogen] = useState('');
//   const [phosphorus, setPhosphorus] = useState('');
//   const [potassium, setPotassium] = useState('');
//   const [phValue, setPhValue] = useState('');
//   const [rainfall, setRainfall] = useState('');
//   const [humidity, setHumidity] = useState('');
//   const [temperature, setTemperature] = useState('');
  


//   // Function to handle crop prediction
//   const handlePredictCrop = async () => {
//     try {
//       setLoading(true);
//       console.log("Predicting...");
//       // Ensure all input values are filled in
//       if (!nitrogen || !phosphorus || !potassium || !phValue) {
//         alert('Please provide all values for N, P, K, and pH.');
//         setLoading(false);
//         return;
//       }
//       console.log("Predicting crop...");
//       // Send the N, P, K, and pH values as part of the request
//       const response = await axios.post('http://127.0.0.1:5000/predict', {
//         nitrogen: nitrogen,
//         phosphorus: phosphorus,
//         potassium: potassium,
//         ph: phValue,
//         rainfall: rainfall,
//         humidity: humidity,
//         temperature: temperature

//       }).catch(error => {
//         console.error('Error posting data:', error);
//         setResponseMessage('Error occurred during prediction');
//         setLoading(false);
//         throw error;
//       });
//       console.log("Predicting...");
//       setPredictedCropIdx(response.data.predicted_crop);
//       setResponseMessage(JSON.stringify(response.data, null, 2));  // Store the entire response from the backend, formatted
//       setLoading(false);
//     } catch (error) {
//       console.error('Error predicting crop:', error);
//       setResponseMessage('Error occurred during prediction');
//       setLoading(false);
//     }
//   };

//   // Function to handle crop info generation
//   const handleGenerateCropInfo = async () => {
//     try {
//       if (predictedCropIdx === null) {
//         alert("Please predict the crop first!");
//         return;
//       }
//       setLoading(true);
//       const response = await axios.post('http://127.0.0.1:5000/generate', {  // Full backend URL
//         predicted_crop_idx: predictedCropIdx,
//       });
//       setCropInfo(response.data.generated_text);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error generating crop info:', error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="App" style={styles.container}>
//       <h1>Crop Predictor 🌱</h1>

//       {/* Input containers for Nitrogen, Phosphorus, Potassium, and pH */}
//       <div style={styles.inputContainer}>
//         <label>
//           Nitrogen (N):
//           <input
//             type="number"
//             value={nitrogen}
//             onChange={(e) => setNitrogen(e.target.value)}
//             style={styles.input}
//           />
//         </label>
//       </div>

//       <div style={styles.inputContainer}>
//         <label>
//           Phosphorus (P):
//           <input
//             type="number"
//             value={phosphorus}
//             onChange={(e) => setPhosphorus(e.target.value)}
//             style={styles.input}
//           />
//         </label>
//       </div>

//       <div style={styles.inputContainer}>
//         <label>
//           Potassium (K):
//           <input
//             type="number"
//             value={potassium}
//             onChange={(e) => setPotassium(e.target.value)}
//             style={styles.input}
//           />
//         </label>
//       </div>

//       <div style={styles.inputContainer}>
//         <label>
//           pH Value:
//           <input
//             type="number"
//             step="0.01"
//             value={phValue}
//             onChange={(e) => setPhValue(e.target.value)}
//             style={styles.input}
//           />
//         </label>
//       </div>
//       <div style={styles.inputContainer}>
//         <label>
//           Temperature :
//           <input
//             type="number"
//             value={temperature}
//             onChange={(e) => setTemperature(e.target.value)}
//             style={styles.input}
//           />
//         </label>
//       </div>
//       <div style={styles.inputContainer}>
//         <label>
//           Humidity:
//           <input
//             type="number"
//             value={humidity}
//             onChange={(e) => setHumidity(e.target.value)}
//             style={styles.input}
//           />
//         </label>
//       </div>
//       <div style={styles.inputContainer}>
//         <label>
//           Rainfall(mm):
//           <input
//             type="number"
//             value={rainfall}
//             onChange={(e) => setRainfall(e.target.value)}
//             style={styles.input}
//           />
//         </label>
//       </div>

//       {/* Button to predict crop */}
//       <button onClick={handlePredictCrop} style={styles.button} disabled={loading}>
//         {loading ? "Predicting..." : "Predict Crop"}
//       </button>

//       {/* Display the predicted crop index */}
//       {predictedCropIdx !== null && (
//         <div style={styles.result}>
//           <h3>Predicted Crop Index: {predictedCropIdx}</h3>
          
//           {/* Display the entire response from the backend */}
                    
//           {/* Button to generate crop info */}
//           <button onClick={handleGenerateCropInfo} style={styles.button} disabled={loading}>
//             {loading ? "Generating Info..." : "Generate Crop Info"}
//           </button>
//         </div>
//       )}

//       {/* Display the generated crop info */}
//       {cropInfo && (
//         <div style={styles.result}>
//           <h3>Generated Crop Info:</h3>
//           <p>{cropInfo}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// // Inline styles for simplicity
// const styles = {
//   container: {
//     textAlign: 'center',
//     padding: '50px',
//     fontFamily: 'Arial, sans-serif',
//   },
//   inputContainer: {
//     margin: '10px 0',
//   },
//   input: {
//     padding: '5px',
//     fontSize: '16px',
//     width: '100px',
//     marginLeft: '10px',
//   },
//   button: {
//     padding: '10px 20px',
//     fontSize: '16px',
//     margin: '10px',
//     cursor: 'pointer',
//     backgroundColor: '#28a745',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//   },
//   result: {
//     marginTop: '20px',
//   }
// };

// export default App;

