# Which Goods and Services Drove Inflation During COVID-19?
## CAPP 30239 Final Project
### Wesley Janson

This folder contains all the relevant files needed for my CAPP 30239 Final Project.

* final_project.html: HTML file containing final project material.
* multiline.js: D3.js code creating the multi-line graph, the first figure in the final_project.html.
* variable_area.js: D3.js code creating the variable area graph, the second figure in final_project.html.
* overlaying_circles.js: D3.js code creating the overlaying circles graph, the third figure in final_project.html.
* covid_prices.csv: Underlying data for "variable_area.js", created in "creating_graph_csvs.R".
* overlap_circles.csv: Underlying data for "overlaying_circles.js", created in "creating_graph_csvs.R".
* pctile_prices.csv: Underlying data for "multiline.js", created in "creating_graph_csvs.R".
* styles.css: Style file for final_project.html.

### data_cleaning subfolder
This subfolder contains the raw data sent from the Federal Reserve Bank of Cleveland, the intermediate prices and weights data, and the R code
used to create the intermediate datasets. 
*   data_cleaning.R: initial data cleaning code that takes in the raw data, and saves the intermediate datasets "prices.csv" and "weights.csv".
*   creating_graph_csvs.R: R code that takes intermediate data CSVs and alters data to export final CSVs that are used in the figures.
*   full_pce_data.xlsx: Prices and weights data, created by the Federal Reserve Bank of Cleveland, from the Bureau of Economic Analysis' raw price and quantity data. I would like to thank Matthew Gordon of the Federal Reserve Bank of Cleveland for sending this dataset over.
*   prices.csv: Final prices data with each components monthly prices reading. 
*   weights.csv: Final weights data with each components monthly weight.