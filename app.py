from flask import Flask, request, jsonify
from connect_cluster import prediction_function  # Assuming you have a prediction function
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print(data)
    status = prediction_function(data)
    print(status)
    return jsonify({'status': status})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
