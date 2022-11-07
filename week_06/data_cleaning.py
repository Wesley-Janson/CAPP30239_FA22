import pandas as pd

data = pd.read_json('a3cleanedonly2015.json')

# Export CSV file of full data
data.to_csv('clean_data.csv')


### Group data by date and flee
data["value"] = 1
ts_data = (data.groupby(['Date', 'Flee']).agg({'value': 'sum'}))

# Export TS Data
ts_data.to_csv('clean_ts_data.csv')