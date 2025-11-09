from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
import pickle 
import os
import threading
from flask_cors import CORS


app = Flask(__name__)


# --- Model loading (startup) ---
model = None
mlb = None
symptom_cols = None
lock = threading.Lock()

def load_assets():
    global model, mlb, symptom_cols
    if model is None:
        # Load once; keep memory steady
        model = tf.keras.models.load_model("saved_model/disease_predictor_multilabel.h5")
        with open("saved_model/mlb.pkl", "rb") as f:
            mlb = pickle.load(f)
        with open("saved_model/symptom_mapping.pkl", "rb") as f:
            symptom_cols = pickle.load(f)

# Eagerly load at boot; comment this out if boot crashes, and rely on lazy load in /predict
load_assets()


@app.route("/")
def home():
    return {"status": "✅ Flask ML API running on Render!"}


@app.route("/predict", methods=["POST"])
def predict():

    # Lazy load as a fallback (safe with lock)
    global model, mlb, symptom_cols
    if model is None:
        with lock:
            if model is None:
                load_assets()

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
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)