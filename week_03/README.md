### Week 3

## Final Project Data

* Data source: Federal Reserve Bank of Cleveland calculations, via the Bureau of Economic Analysis
Raw data link: https://bea.gov/national/Release/XLS/Underlying/Section2All_xls.xlsx


* Data Description: This data is from the Bureau of Economic Analysis' (BEA) Personal Income and Outlays report. 
This data is what is used in their Personal Consumption Expenditures (PCE) Price Index, a measure of inflation targeted
by the Federal Reserve System. More specifically, I have a CSV of prices (prices.csv) for the 200 components (i.e. the basket of goods) in the index, and their relative weights as a percentage of total quantity (weights.csv) from January 1997 onwards.

* I am interested in this topic because of its increasing relevance to day-to-day life; inflation, that is.
This is also a topic that I have spent quite an amount of time researching (an undergraduate thesis, and then
3 years as a Research Assistant at the Fed in Cleveland), but have never done much more than boring line 
graphs etc. when it comes ot data visualization on the subject. This is an excellent opportunity to use some of the
skills that I will build in this class and apply them to a subject I am familiar with.

* I hope to use this data to create interesting and original visuals that can give the lay-person an idea of what
data goes into inflation measures, and how different components price changes may vary. 

* The potential data points I have are all of the components (i.e. basket of goods) from the PCE Price Index measure.
Using the weights data, I can show the relative importance of each component, or just a select few (i.e. which component
is influencing the inflation reading the most, least, etc.).

* I don't have too many concerns about the data, considering it is from a government agency and completely disaggregated 
by component.

* I would categorize it as a primary source, although this data has had some manipulation by the Federal
Reserve Bank of Cleveland, simply creating the relative weights from the raw quantities data.

## Visualizing Library Visits with HTML and D3.js
* Using both HTML and D3.js, we are able to create simple bar graph illustrating the number of visits to different libraries in January of 2022. This data was downloaded from the [Chicago Data Portal](https://data.cityofchicago.org/Education/Libraries-2022-Visitors-by-Location/ykhx-yxn9).