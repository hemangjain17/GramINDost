from flask import Flask, request, jsonify
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
    'rice': 20,
    'maize': 11,
    'chickpea': 1,
    'kidneybeans': 9,
    'mothbeans': 13,
    'pigeonpeas': 18,
    'mungbean': 11,
    'blackgram': 1,
    'lentil': 19,
    'pomegranate': 1,
    'banana': 1,
    'mango': 0,
    'grapes': 21,
    'watermelon': 15,
    'muskmelon': 16,
    'apple': 0,
    'orange': 16,
    'papaya': 17,
    'coconut': 0,
    'cotton': 6,
    'jute': 8,
    'coffee': 5
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
def health_monitoring(nitrogen, phosphorus, potassium, ph_value, crop):
    input_text = (
        f"The nitrogen content is {nitrogen}, phosphorus is {phosphorus}, "
        f"potassium is {potassium}, and pH is {ph_value} during the growth of {crop}.You are a Agriculture specialist, Please analyze the soil health based on these values. "
        "Provide the response in the following structured format:\n\n"
        "1. Nutrient Levels:\n"
        "   - Nitrogen: [Provide assessment, e.g., high, optimal, or low, and potential effects]\n"
        "   - Phosphorus: [Provide assessment, e.g., high, optimal, or low, and potential effects]\n"
        "   - Potassium: [Provide assessment, e.g., high, optimal, or low, and potential effects]\n"
        "   - pH Level: [Provide assessment, e.g., high, optimal, or low, and potential effects]\n\n"
        "2. Nutrient Deficiencies:\n"
        "   - [List any deficiencies, based on the input values in a paragraph]\n\n"
        "3. Fertilizer Recommendations:\n"
        "   - [Suggest the type and quantitative amount of fertilizer needed to correct deficiencies or optimize levels in a paragraph]\n\n"
        "4. Preventive Measures:\n"
        "   - [Recommend any preventive measures to maintain soil health and avoid nutrient loss in a paragraph ]\n\n"
        "Please ensure that each section is clearly labeled and concise and output is returned in a json format for easy parsing."
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
            max_tokens=800,
            stream=True
        )

        generated_text = ""
        for chunk in stream:
            generated_text += chunk.choices[0].delta.content

        json_content = re.search(r'\{.*\}', generated_text, re.DOTALL)

        if json_content:
            print(f"Generated Health Info: {json_content.group(0)}")
        else:
            print("No JSON found in the generated text.")

        # Convert generated text to JSON format for better handling
        try:
            return json.loads(json_content.group(0)) 
        except json.JSONDecodeError:
            print("Generated text is not valid JSON. Returning as plain text.")
            return "Error generating health monitoring information."

    except Exception as e:
        print(f"Error during health monitoring: {e}")
        return "Error generating health monitoring information."

@app.route('/health', methods=['POST'])
def health():
    # Get the input data from the user
    data = request.json
    nitrogen = data.get('nitrogen')
    phosphorus = data.get('phosphorus')
    potassium = data.get('potassium')
    ph_value = data.get('ph')
    crop = data.get('crop')

    if not all([nitrogen, phosphorus, potassium, ph_value, crop]):
        return jsonify({'error': 'Please provide valid values for nitrogen, phosphorus, potassium, and pH.'}), 400

    health_info = health_monitoring(nitrogen, phosphorus, potassium, ph_value, crop)

    return jsonify({'health_info': health_info})

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    nitrogen = data.get('nitrogen')
    phosphorus = data.get('phosphorus')
    potassium = data.get('potassium')
    ph_value = data.get('ph')
    print(nitrogen, phosphorus, potassium, ph_value)

    if not all([nitrogen, phosphorus, potassium, ph_value]):
        return jsonify({'error': 'Please provide valid values for nitrogen, phosphorus, potassium, and pH.'}), 400

    text = f"The nitrogen content is {nitrogen}, phosphorus is {phosphorus}, and potassium is {potassium}, pH is {ph_value} with a temperature of 20.86896°C. What is the crop grown under these situations?"
    index_to_crop = {}
    for crop, index in crop_labels.items():
        if index not in index_to_crop: 
            index_to_crop[index] = []
        index_to_crop[index].append(crop)
    predicted_crop_idx = predict_crop(text)
    
    predicted_crops = index_to_crop.get(predicted_crop_idx, None)
  
    return jsonify({'predicted_crop': predicted_crops})

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



if __name__ == '__main__':
    app.run(debug=False)
