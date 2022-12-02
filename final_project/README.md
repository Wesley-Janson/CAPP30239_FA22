### Which Goods and Services Drove Inflation During COVID-19?
## CAPP 30239 Final Project
# Wesley Janson

# data_cleaning
This folder contains the raw data sent from the Federal Reserve Bank of Cleveland, the intermediate prices and weights data, and the R code
used to create the intermediate datasets. 
* data_cleaning.R: initial data cleaning code that takes in the raw data, and saves the intermediate datasets "prices.csv" and "weights.csv".
* creating_graph_csvs.R: R code that takes intermediate data CSVs and alters data to export final CSVs that are used in the figures.
* full_pce_data.xlsx: Prices and weights data, created by the Federal Reserve Bank of Cleveland, from the Bureau of Economic Analysis' raw price and quantity data. I would like to thank Matthew Gordon of the Federal Reserve Bank of Cleveland for sending this dataset over.
* prices.csv: Final prices data with each components monthly prices reading. 
* weights.csv: Final weights data with each components monthly weight.