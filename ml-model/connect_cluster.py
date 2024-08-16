import pymongo
import pickle
import statsmodels.api as sm
from statsmodels.tsa.statespace.sarimax import SARIMAXResults
import pandas as pd
from datetime import date

def predict_next_four_weeks(model: SARIMAXResults, start_date: str):
    start_date = pd.to_datetime(start_date)
    start_week = start_date.isocalendar()[1]
    end_week = start_week + 4
    predictions = model.predict(start=start_week, end=end_week)
    return list(predictions.values.astype(float))

def convert_int(numpy_float_list):
    return [int(x) for x in numpy_float_list]

def calc_status(collection, product_name, prediction, product_inventory):
    # doc = collection.find_one({'name': product_name})
    # print(f"Retrieved document for {product_name}: {doc}")  # Add this line
    
    # if not doc:
    #     print(f"Product {product_name} not found in the database")
    #     return 0  # or some default value if the product is not found
    
    inv = product_inventory
    print(f"Current inventory for {product_name}: {inv}")
    
    if inv is None:
        print(f"Inventory for {product_name} is None")
        return -1
    
    try:
        inv = int(inv)  # Ensure inv is an integer
    except ValueError:
        print(f"Invalid inventory value for {product_name}: {inv}")
        return -1

    if inv - prediction[0] <= 0:
        new_status = 1
        demand = inv - prediction[0]
    elif inv - prediction[0] - prediction[1] <= 0:
        new_status = 2
        demand = inv - prediction[0] - prediction[1]
    elif inv - prediction[0] - prediction[1] - prediction[2] - prediction[3] - prediction[4] <= 0:
        new_status = 3
        demand = inv - prediction[0] - prediction[1] - prediction[2] - prediction[3] - prediction[4]
    else:
        new_status = 0
        demand = 0

    print(f"Updating status for {product_name} to {new_status}")
    result = collection.update_one({'name': product_name}, {'$set': {'status': new_status}})
    print(f"Update result: {result.modified_count} document(s) modified")

    return new_status, (demand*-1)

# fairy: [76, 102, 136, 244, 310]
# rice: [2549, 2603, 2659, 2689, 2716]
# notebook: [7721, 8112, 6765, 6378, 6549]
# necklace: [170, 180, 189, 198, 220]
# facewash: [464, 469, 474, 475, 468]

def prediction_function(data):
    curr_date = date.today()
    client = pymongo.MongoClient("mongodb+srv://vivekraheja22:vivekraheja22@cluster0.baiyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&ssl=true")
    db = client['walmart']
    collection = db['products']

    product_name = data.get('name')  
    product_inventory = data.get('inventory') 
    model_path = f'/Users/mansi/Desktop/hacks/walmart/ml-model/models/{product_name.lower()}.pkl'

    try:
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
        prediction = convert_int(predict_next_four_weeks(model, curr_date))
        print(f"Predicted sales for the next four weeks: {prediction}") 
        status, demand = calc_status(collection, product_name, prediction, product_inventory)
        print(f"Inventory status for {product_name}: {status}")
        return status, demand
    except FileNotFoundError:
        print(f"Model file not found: {model_path}")
        return None
    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        return None
    finally:
        client.close()

# Remove the __main__ block if it's not needed
    
    
    