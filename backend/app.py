from flask import Flask, request, jsonify
from flask_cors import CORS # This allows React to talk to Flask
import joblib

app = Flask(__name__)
CORS(app) # Very important for beginners!

# Load your model (Make sure 'rerouting_model.pkl' is in the same folder)
# If you don't have a .pkl file yet, this will error. 
model = joblib.load('rerouting_model.pkl')

@app.route('/predict-route', methods=['POST'])
def predict():
    data = request.json
    # Assuming your model needs numbers like [latitude, longitude, traffic_score]
    input_data = [data['lat'], data['lng'], data['traffic']]
    
    prediction = model.predict([input_data]) 
    
    return jsonify({"new_route": prediction.tolist()})

if __name__ == '__main__':
    app.run(port=5000, debug=True)