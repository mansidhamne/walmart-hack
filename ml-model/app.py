from flask import Flask, request, jsonify
from connect_cluster import prediction_function
from flask_cors import CORS
import traceback
from chart_data import *

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print("Received data:", data)
        status, demand = prediction_function(data)
        if status is None:
            return jsonify({'error': 'Prediction failed'}), 500
        print("Prediction status:", status)
        print("Demand:", demand)
        return jsonify({'status': status})
    except Exception as e:
        print("Error in prediction:", str(e))
        print(traceback.format_exc())
        return jsonify({'error': str(e)}), 500
    
@app.route('/calc-demand', methods=['POST'])
def calc_demand():
    try:
        data = request.json
        print("Received data:", data)
        status, demand = prediction_function(data)
        print("Demand:", demand)
        return jsonify({'demand': demand})
    except Exception as e:
        print("Error in demand calculation:", str(e))
        print(traceback.format_exc())
        return jsonify({'error': str(e)}), 500
    
@app.route('/pie-data')
def pie():
    data = {
        "labels": ["Beauty Care", "Home Decor", "Accessories", "Stationary", "Groceries"],
        "values": [500, 200, 300,1200, 1900]
    }
    return jsonify(data)
    
@app.route('/graph-data')
def get_graph_data():
    try:
        data = {
            "labels": dates,
            "datasets": [
                {
                    "label": "Facewash",
                    "data": fw,
                    "borderColor": "rgb(75, 192, 192)",
                    "backgroundColor": "rgba(75, 192, 192, 0.2)"
                },
                {
                    "label": "Fairy Lights",
                    "data": fl,
                    "borderColor": "rgb(255, 99, 132)",
                    "backgroundColor": "rgba(255, 99, 132, 0.2)"
                },
                {
                    "label": "Necklace",
                    "data": nl,
                    "borderColor": "rgb(255, 206, 86)",
                    "backgroundColor": "rgba(255, 206, 86, 0.2)"
                },
                {
                    "label": "Notebook",
                    "data": no,
                    "borderColor": "rgb(54, 162, 235)",
                    "backgroundColor": "rgba(54, 162, 235, 0.2)"
                },
                {
                    "label": "Rice",
                    "data": ri,
                    "borderColor": "rgb(153, 102, 255)",
                    "backgroundColor": "rgba(153, 102, 255, 0.2)"
                }
            ]
        }
        return jsonify(data)
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)