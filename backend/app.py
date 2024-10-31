from flask import Flask, request, jsonify
import torch
from sklearn.preprocessing import LabelEncoder
from transformers import AutoTokenizer, AutoModelForSequenceClassification, AutoModelForCausalLM, AutoConfig
from flask_cors import CORS
import os 
import bitsandbytes as bnb

app = Flask(__name__)
CORS(app)

print("CUDA available:", torch.cuda.is_available())
model_path = r'C:\Users\itsta\OneDrive\Desktop\HEMANG\Smart Farm\smart-farm\backend\fine_tuned_bert_model'

if os.path.exists(model_path):   
    tokenizer_seq = AutoTokenizer.from_pretrained(model_path)
    model_seq = AutoModelForSequenceClassification.from_pretrained(model_path)
    print("Model loaded successfully for sequence classification!")
else:
    print(f"Model directory does not exist: {model_path}")



tokenizer_gen = AutoTokenizer.from_pretrained("microsoft/Phi-3.5-mini-instruct")
config = AutoConfig.from_pretrained("microsoft/Phi-3.5-mini-instruct")

# Load specific layers
model_gen = AutoModelForCausalLM.from_config(config)
print("Model loaded successfully for Text Generation!")

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
    input_text = f"The predicted crop is {predicted_crop_idx}. Write a paragraph about its unique characteristics, uses, and its importance in agriculture."
    input_ids = tokenizer_gen.encode(input_text, return_tensors="pt")
    outputs = model_gen.generate(input_ids=input_ids, max_length=200, num_beams=4, early_stopping=True)

    generated_text = tokenizer_gen.decode(outputs[0], skip_special_tokens=True)
    return generated_text

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    nitrogen = data.get('nitrogen')
    phosphorus = data.get('phosphorus')
    potassium = data.get('potassium')
    ph_value = data.get('ph')
    print(nitrogen, phosphorus, potassium, ph_value)
    # Check if all the required values are provided
    if not all([nitrogen, phosphorus, potassium, ph_value]):
        return jsonify({'error': 'Please provide valid values for nitrogen, phosphorus, potassium, and pH.'}), 400

    text = f"The nitrogen content is {nitrogen}, phosphorus is {phosphorus}, and potassium is {potassium}, pH is {ph_value} with a temperature of 20.86896°C. what is the crop grown under these situations?"
    index_to_crop = {}
    for crop, index in crop_labels.items():
        if index not in index_to_crop: 
            index_to_crop[index] = []
        index_to_crop[index].append(crop)
    predicted_crop_idx = predict_crop(text)
    
    predicted_crops = index_to_crop.get(predicted_crop_idx, None)

    if predicted_crops is not None:
        print(f"Predicted Crop Name: {predicted_crops}")
    else:
        print("Predicted index not found.")
  
    return jsonify({'predicted_crop': predicted_crops})

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    predicted_crop_idx = data.get('predicted_crop_idx')

    if predicted_crop_idx is None:
        return jsonify({'error': 'No predicted crop index provided'}), 400

    generated_text = generate_crop_info(predicted_crop_idx)
    print(f"Generated Text for Crop Index {predicted_crop_idx}: {generated_text}")

    return jsonify({'generated_text': generated_text})

if __name__ == '__main__':
    app.run(debug=True)
