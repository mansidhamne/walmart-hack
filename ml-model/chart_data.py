import pandas as pd

fw = pd.read_csv('./data/facewash.csv')
fl = pd.read_csv('./data/fairy_lights.csv')
nl = pd.read_csv('./data/necklace.csv')
no = pd.read_csv('./data/notebook.csv')
ri = pd.read_csv('./data/rice.csv')

dates = fw['week_start_date'].tolist()

fw = fw['facewash'].tolist()
fl = fl['fairy_lights'].tolist()
nl = nl['necklace'].tolist()
no = no['notebook'].tolist()
ri = ri['rice'].tolist()



print(dates)

data = {
    'facewash': fw,
    'fairy_lights': fl,
    'necklace': nl,
    'notebook': no,
    'rice': ri
}

# print(data)