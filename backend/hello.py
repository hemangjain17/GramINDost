from flask import Flask, request , jsonify 
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from flask_cors import CORS
from huggingface_hub import InferenceClient
import os
import json 
import re 
app = Flask(__name__)
CORS(app)

print("CUDA available:", torch.cuda.is_available())
model_path = "backend/fine_tuned_bert_model"
if os.path.exists(model_path):   
    tokenizer_seq = AutoTokenizer.from_pretrained(model_path)
    model_seq = AutoModelForSequenceClassification.from_pretrained(model_path)
    print("Model loaded successfully for sequence classification!")
else:
    print(f"Model directory does not exist: {model_path}")

client = InferenceClient(api_key="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")

crop_labels = {
    'Rice': 20,
    'Maize': 11,
    'Chickpea': 7,
    'Kidneybeans': 9,
    'MothBeans': 13,
    'Pigeon Peas': 18,
    'Mungbean': 12,
    'Blackgram': 2,
    'Lentil': 19,
    'Pomegranate': 3,
    'Banana': 1,
    'Mango': 0,
    'Grapes': 21,
    'Watermelon': 15,
    'Muskmelon': 14,
    'Apple': 10,
    'Orange': 16,
    'Papaya': 17,
    'Coconut': 4,
    'Cotton': 6,
    'Jute': 8,
    'Coffee': 5
}

def predict_crop(text):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model_seq.to(device)

    inputs = tokenizer_seq(text, return_tensors='pt', truncation=True, padding=True).to(device)

    with torch.no_grad():
        outputs = model_seq(**inputs)

    logits = outputs.logits
    predicted_class_idx = torch.argmax(logits, dim=-1).item()
    print(predicted_class_idx)
    return predicted_class_idx

def generate_crop_info(predicted_crop_idx):
    input_text = f"The predicted crop is {predicted_crop_idx[0]}. Write a paragraph about its unique characteristics, uses, and its importance in agriculture."

    messages = [
        {
            "role": "user",
            "content": input_text
        }
    ]

    try:
        stream = client.chat.completions.create(
            model="microsoft/Phi-3.5-mini-instruct",
            messages=messages,
            max_tokens=400,
            stream=True,
        )
        

        generated_text = ""
        for chunk in stream:
            generated_text += chunk.choices[0].delta.content

        print(f"Generated Text: {generated_text}")
        return generated_text

    except Exception as e:
        print(f"Error during inference: {e}")
        return "Error generating text."

def health_monitoring(nitrogen, phosphorus, potassium, ph_value, temp, conductivity, humidity, crop):
    format = """{
      "Nutrient Levels": {
        "Nitrogen": "[Assessment: e.g., high, optimal, or low, and its potential effects on crop growth]",
        "Phosphorus": "[Assessment: e.g., high, optimal, or low, and its potential effects on crop growth]",
        "Potassium": "[Assessment: e.g., high, optimal, or low, and its potential effects on crop growth]",
        "Temperature": "[Assessment: e.g., high, optimal, or low, and its potential effects on crop growth]",
        "Humidity": "[Assessment: e.g., high, optimal, or low, and its potential effects on crop growth]",
        "Conductivity": "[Assessment: e.g., high, optimal, or low, and its potential effects on crop growth]",
        "pH Level": "[Assessment: e.g., high, optimal, or low, and its potential effects on crop growth]"
      },
      "Nutrient Deficiencies": "[List any 4 identified deficiencies based on the provided values in a concise paragraph]",
      "Fertilizer Recommendations": "[Provide the type and quantitative amount of fertilizers needed to correct deficiencies or optimize nutrient levels]",
      "Preventive Measures": "[Recommend any 3 strategies in one to two line to maintain soil health and prevent nutrient loss]"
    }"""

    input_text = (
        "Analyze the soil health based on the following provided values:"
        f"Nitrogen Content: {nitrogen} in milligrams per litre"
        f"Phosphorus Content: {phosphorus} in milligrams per litre "
        f"Potassium Content: {potassium} in milligrams per litre "
        f"pH Level: {ph_value} "
        f"Temperature: {temp} in degrees Celsius "
        f"Humidity: {humidity} in percentage "
        f"Conductivity: {conductivity} in Seimens per meter "
        f"Crop: {crop} "
        "You are an Agriculture Specialist. Based on these values, provide a detailed analysis of soil health in the following structured JSON formatonly without any further explanations:"
        f"{format}"
    )

    messages = [
        {
            "role": "user",
            "content": input_text
        }
    ]

    try:
        stream = client.chat.completions.create(
            model="microsoft/Phi-3.5-mini-instruct",
            messages=messages,
            max_tokens=1000,
            stream=True
        )

        generated_text = ""
        for chunk in stream:
            if 'choices' in chunk and 'delta' in chunk.choices[0]:
                generated_text += chunk.choices[0].delta.content
        print(f"Generated Text: {generated_text}")
        json_match = re.search(r'\{.*\}', generated_text, re.DOTALL)

        if json_match:
            extracted_json = json_match.group(0)
            print(extracted_json)
        else:
            print("No valid JSON found in the generated text.")
        # Attempt to parse as JSON
        try:
            response_json = json.loads(extracted_json)
            return response_json
        except json.JSONDecodeError:
            print("Generated text is not valid JSON.")
            return {"error": "Invalid JSON output from the model."}

    except Exception as e:
        print(f"Error during health monitoring: {e}")
        return {"error": "Error generating health monitoring information."}

@app.route('/health', methods=['POST'])
def health():
    # Get the input data from the user
    data = request.json
    nitrogen = data.get('nitrogen')
    phosphorus = data.get('phosphorus')
    potassium = data.get('potassium')
    ph_value = data.get('ph')
    temp = data.get('temperature')
    conductivity = data.get('conductivity')
    humidity = data.get('humidity')
    crop = data.get('crop')

    if not all([nitrogen, phosphorus, potassium, ph_value, temp, conductivity, humidity, crop]):
        return jsonify({'error': 'Please provide valid values for nitrogen, phosphorus, potassium, and pH.'}), 400

    health_info = health_monitoring(nitrogen, phosphorus, potassium, ph_value, temp, conductivity, humidity, crop) 

    return jsonify(health_info)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    nitrogen = data.get('nitrogen')
    phosphorus = data.get('phosphorus')
    potassium = data.get('potassium')
    ph_value = data.get('ph')
    temperature = data.get('humidity')
    humidity = data.get('temperature')

    if not all([nitrogen, phosphorus, potassium, ph_value]):
        return jsonify({'error': 'Please provide valid values for nitrogen, phosphorus, potassium, and pH.'}), 400

    text = f"The nitrogen content is {nitrogen}, phosphorus is {phosphorus}, and potassium is {potassium}, pH is {ph_value} with a temperature of {temperature} and humidity {humidity}. What is the crop grown under these situations?"
    index_to_crop = {}
    for crop, index in crop_labels.items():
        index_to_crop.setdefault(index, []).append(crop)

    predicted_crop_idx = predict_crop(text)
    predicted_crops = index_to_crop.get(predicted_crop_idx, [])
    print(f"Predicted Crops: {predicted_crops}")
    if not predicted_crops:
        return jsonify({'error': 'No crops found for the predicted index'}), 404
    print (jsonify({'Predicted Crop': predicted_crops}))
    return jsonify({'Predicted Crop': predicted_crops})

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    predicted_crop_idx = data.get('predicted_crop_idx')
    print(predicted_crop_idx[0])
    if predicted_crop_idx is None:
        return jsonify({'error': 'No predicted crop index provided'}), 400

    generated_text = generate_crop_info(predicted_crop_idx)
    print(f"Generated Text for Crop Index {predicted_crop_idx}: {generated_text}")

    return jsonify({'generated_text': generated_text})

@app.route('/api/submitForm', methods=['POST'])
def submit_form():
    try:
        data = request.get_json()
        email = data.get('email')
        contact = data.get('contact')
        
        if not email or not contact:
            return jsonify({"success": False, "message": "Email and contact are required"}), 400
        
        # Call function to append data to Google Sheets
        append_to_sheet(email, contact)
        return jsonify({"success": True})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"success": False, "message": "Error submitting form"}), 500


if __name__ == '__main__':
    app.run(debug=False)
