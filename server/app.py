from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = FastAPI()

# Allow requests from your frontend (React, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict this to your actual frontend URL in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model once at startup, not per-request
model = tf.keras.models.load_model("models/waste_classifier.keras")  # or .keras
class_names = ['Hazardous', 'Non-Recyclable', 'Organic', 'Recyclable'] # your actual classes, in order

IMG_SIZE = (128, 128)  # match your training input size

def preprocess_image(image_bytes: bytes) -> np.ndarray:
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize(IMG_SIZE)
    img_array = np.array(img, dtype=np.float32)
    img_array = np.expand_dims(img_array, axis=0)  # shape: (1, 128, 128, 3)
    # Note: don't manually divide by 255 here if your model has a Rescaling(1./255) layer built in
    return img_array

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if file.content_type is None or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    image_bytes = await file.read()

    try:
        img_array = preprocess_image(image_bytes)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not process image: {e}")

    predictions = model.predict(img_array)
    predicted_idx = int(np.argmax(predictions[0]))
    confidence = float(predictions[0][predicted_idx])

    return {
        "class": class_names[predicted_idx],
        "confidence": round(confidence, 4),
        "all_probabilities": {
            class_names[i]: round(float(predictions[0][i]), 4)
            for i in range(len(class_names))
        }
    }

@app.get("/")
def health_check():
    return {"status": "model server running"}