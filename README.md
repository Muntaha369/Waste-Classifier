# ♻️ Waste Classifier

An AI-powered web application that classifies images of waste into standard environmental categories (*Organic*, *Recyclable*, *Non-Recyclable*, *Hazardous*) using a deep learning TensorFlow model and a modern Next.js frontend.

---

## 🌟 Key Features

- 📸 **Image Upload & Preview**: Drag-and-drop or select waste images for real-time visual preview.
- 🤖 **AI Classification**: Powered by a custom TensorFlow / Keras convolutional model.
- 📊 **Probability Breakdown**: Displays predictions with top-class confidence scores and complete class probability distribution.
- 🎨 **Modern Naturalistic UI**: Clean dark theme design built with Next.js, React 19, and Tailwind CSS.
- ⚡ **Fast & Responsive**: Asynchronous REST API integration between Next.js and FastAPI.

---

## 📁 Repository Structure

```text
waste_classifier/
├── client/              # Next.js 16 (React 19 + Tailwind CSS) Frontend
│   ├── app/             # Next.js App Router components & pages
│   ├── public/          # Static assets
│   ├── .env.local       # Environment variables (API base URL)
│   └── package.json     # Frontend dependencies & scripts
├── server/              # FastAPI + TensorFlow Backend
│   ├── models/          # Trained Keras model files (.keras)
│   ├── notebooks/       # Model training Jupyter notebooks
│   └── app.py           # FastAPI application server & prediction logic
└── README.md            # Project documentation
```

---

## 🛠️ Tech Stack

### **Frontend (`/client`)**
- **Framework**: Next.js 16 (App Router) & React 19
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Axios

### **Backend (`/server`)**
- **Framework**: FastAPI + Uvicorn
- **Machine Learning**: TensorFlow / Keras
- **Image Processing**: Pillow (PIL), NumPy

---

## 🏷️ Waste Categories

The classification model identifies the following waste classes:
- 🟢 **Organic**: Food scraps, yard waste, compostable matter.
- 🔵 **Recyclable**: Paper, cardboard, plastics, glass, metals.
- ⚪ **Non-Recyclable**: General trash, mixed materials.
- 🔴 **Hazardous**: Batteries, electronics, chemicals, medical waste.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: `v18+` or `v20+`
- **Python**: `3.9+` or `3.10+`

---

### 2. Backend Setup (`/server`)

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Create and activate a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install required dependencies:
   ```bash
   pip install fastapi uvicorn tensorflow pillow numpy
   ```

4. Run the FastAPI dev server:
   ```bash
   uvicorn app:app --reload --port 8000
   ```

The backend server will start at `http://localhost:8000`. You can test the health endpoint at `http://localhost:8000/`.

---

### 3. Frontend Setup (`/client`)

1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `client/.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/predict
   ```

4. Start the Next.js development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📡 API Reference

### `POST /predict`

Uploads an image file for AI classification.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (Image file: PNG, JPG, JPEG, WebP)

**Sample Response (`200 OK`):**
```json
{
  "class": "Recyclable",
  "confidence": 0.9425,
  "all_probabilities": {
    "Hazardous": 0.0012,
    "Non-Recyclable": 0.0315,
    "Organic": 0.0248,
    "Recyclable": 0.9425
  }
}
```

---

## 📜 License

This project is open-source under the [MIT License](LICENSE).
