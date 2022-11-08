import pandas as pd
import numpy as np

data = pd.read_json('a3cleanedonly2015.json')
data['Flee'] = np.where((data['Flee']==True), "Fled", "Did Not Flee")

# Export CSV file of full data
data.to_csv('clean_data.csv')


### Group data by date and flee
data["value"] = 1
ts_data = (data.groupby(['Date', 'Flee']).agg({'value': 'sum'}))

# Export TS Data
ts_data.to_csv('clean_ts_data.csv')
