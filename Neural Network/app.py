from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
import pickle 
import os

app = Flask(__name__)

model = tf.keras.models.load_model("saved_model/disease_predictor_multilabel.h5")
with open("saved_model/mlb.pkl", "rb") as f:
    mlb = pickle.load(f)
with open("saved_model/symptom_mapping.pkl", "rb") as f:
    symptom_cols = pickle.load(f)

@app.route("/")
def hello_world():
    return "Hello World!"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    symptoms = data.get("symptoms", [])
    top_n = int(data.get("top_n", 5))

    # Create binary vector
    symptom_list = [s.strip().lower() for s in symptoms]
    input_vector = np.array([[1 if col.lower() in symptom_list else 0 for col in symptom_cols]])

    preds = model.predict(input_vector)[0]
    top_indices = preds.argsort()[-top_n:][::-1]
    top_diseases = [(mlb.classes_[i], round(float(preds[i] * 100), 2)) for i in top_indices]
    
    # Normalize for confidence scaling
    total = sum([p for _, p in top_diseases])
    normalized = [(d, round(p / total * 100, 2)) for d, p in top_diseases]

    results = [
        {"disease": d, "confidence": conf}
        for d, conf in normalized
    ]

    return jsonify({"predictions": results})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)