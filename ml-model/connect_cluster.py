import pymongo
import pickle
import statsmodels.api as sm
from statsmodels.tsa.statespace.sarimax import SARIMAXResults
import pandas as pd
from datetime import date

def predict_next_four_weeks(model: SARIMAXResults, start_date: str): ## start_date: 'YYYY-MM-DD'
    start_date = pd.to_datetime(start_date)
    start_week = start_date.isocalendar()[1]
    end_week = start_week + 4
    predictions = model.predict(start=start_week, end=end_week)
    return list(predictions.values.astype(float))


def convert_int(numpy_float_list):
    regular_int_list = [int(x) for x in numpy_float_list]
    return regular_int_list 


def calc(product_name,prediction):
    doc=collection.find_one({'name': product_name})
    inv=doc.get('inventory')
    if inv-prediction[0]<=0:
        collection.update_one({'name': product_name},{'$set':{'status':1}})
        return 1
    elif inv-prediction[0]-prediction[1]<=0:
        collection.update_one({'name': product_name},{'$set':{'status':2}})
        return 2
    elif inv-prediction[0]-prediction[1]-prediction[2]-prediction[3]-prediction[4]<=0:
        collection.update_one({'name': product_name},{'$set':{'status':3}})
        return 3
    else:
        collection.update_one({'name': product_name},{'$set':{'status':0}})
        return 4
    
    
if __name__=="__main__":
    curr_date=date.today()
    client=pymongo.MongoClient("mongodb+srv://vivekraheja22:vivekraheja22@cluster0.baiyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&ssl=true")
    print(client)
    db=client['walmart']
    collection=db['products']
    # with open('C:/Users/Vivek/Desktop/codes/walmart/models/models/facewash.pkl' , 'rb') as f:
    #     model_facewash = pickle.load(f)
    # facewash_prediction=convert_int(predict_next_four_weeks(model_facewash, curr_date))

    with open('/Users/mansi/Desktop/hacks/walmart/ml-model/models/fairy_lights.pkl' , 'rb') as f:
        model_fairy = pickle.load(f)
    fairy_prediction=convert_int(predict_next_four_weeks(model_fairy, curr_date))
    status = calc('Fairy Light', fairy_prediction)
    print(status)

    # with open('C:/Users/Vivek/Desktop/codes/walmart/models/models/necklace.pkl' , 'rb') as f:
    #     model_necklace = pickle.load(f)
    # necklace_prediction=convert_int(predict_next_four_weeks(model_necklace, curr_date))

    # with open('C:/Users/Vivek/Desktop/codes/walmart/models/models/notebook.pkl' , 'rb') as f:
    #     model_notebook = pickle.load(f)
    # notebook_prediction=convert_int(predict_next_four_weeks(model_notebook, curr_date))

    # with open('C:/Users/Vivek/Desktop/codes/walmart/models/models/rice.pkl' , 'rb') as f:
    #     model_rice = pickle.load(f)
    # rice_prediction=convert_int(predict_next_four_weeks(model_rice, curr_date))
    
    print(fairy_prediction)
    # print(rice_prediction)
    # print(notebook_prediction)
    # calc('Facewash',facewash_prediction)
    # calc('Fairy Light',fairy_prediction)
    # calc('Necklace',necklace_prediction)
    # calc('Notebook',notebook_prediction)
    # calc('Rice',rice_prediction)
    
    
    
    
    