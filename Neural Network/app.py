from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
import pickle 
import os
import threading
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# --- Globals ---
interpreter = None
input_index = None
output_index = None
mlb = None
symptom_cols = None
lock = threading.Lock()

def load_tflite_model():
    global interpreter, input_index, output_index, mlb, symptom_cols

    if interpreter is None:
        interpreter = tf.lite.Interpreter(model_path="saved_model/disease_predictor_multilabel.tflite")
        interpreter.allocate_tensors()

        input_details = interpreter.get_input_details()
        output_details = interpreter.get_output_details()
        input_index = input_details[0]['index']
        output_index = output_details[0]['index']

        # Load supporting files
        with open("saved_model/mlb.pkl", "rb") as f:
            mlb = pickle.load(f)
        with open("saved_model/symptom_mapping.pkl", "rb") as f:
            symptom_cols = pickle.load(f)


@app.route("/")
def home():
    return {"status": "✅ Flask ML API running on Render!"}


@app.route("/predict", methods=["POST"])
def predict():
    global interpreter, mlb, symptom_cols
    
    # Lazy load the model only on demand
    if interpreter is None:
        with lock:
            if interpreter is None:
                load_tflite_model()

    data = request.get_json()
    symptoms = data.get("symptoms", [])
    top_n = int(data.get("top_n", 5))

    # Create binary vector
    symptom_list = [s.strip().lower() for s in symptoms]
    input_vector = np.array([[1 if col.lower() in symptom_list else 0 for col in symptom_cols]])

    # Run inference
    interpreter.set_tensor(input_index, input_vector)
    interpreter.invoke()
    output = interpreter.get_tensor(output_index)[0]

    # Select Top-N results
    top_indices = output.argsort()[-top_n:][::-1]
    top_diseases = [(mlb.classes_[i], round(float(output[i] * 100), 2)) for i in top_indices]
    
    # Normalize confidence
    total = sum([p for _, p in top_diseases])
    normalized = [(d, round(p / total * 100, 2)) for d, p in top_diseases]

    return jsonify({
        "predictions": [{"disease": d, "confidence": conf} for d, conf in normalized]
    })


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)