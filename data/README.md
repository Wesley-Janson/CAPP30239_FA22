# Data Folder

## COVID-relevant Data
* This data allows for a further exploration into developments of PCE inflation during COVID-19. While once again there is a 
plethora of information that is relevant, I decide on finding the 10 components that have the highest 
average weight from February 2020 to present, and create an index (Feb 2020=100) to observe how the 
comparatively important goods and services have changed in relative price since February 2020, right
before COVID became a worldwide epidemic.
    * covid_prices_weights.csv: Contains highest 10 weighted components and their respective indices
    since Febraury 2020.

## Average Data
* This data is designed to illustrate over a 10 year period (2012-2022), what components to PCE inflation
had the highest average weight, monthly percent change, and annual percent change.
    * avg_prices10_annual.csv: 10 components with highest average annual percent change in prices.
    * avg_prices10_monthly.csv: 10 components with highest average monthly percent change in prices.
    * avg_weights_top10.csv: 10 components with highest average monthly weights.

## High Occurrance as Top Component Data
* This data tabulates each time an individual component was in the top 10 (highest) by weight, month-over-month
percent change, or annual percent change.
    * most_occur_top_weights.csv: List of components that appeared in the top 10 weights of each month, sorted by occurrance.
    * most_occur_top_prices_annual.csv: List of components that appeared in the top 10 annual percent change in price of each month,
     sorted by occurrance.
    * most_occur_top_prices_monthly.csv: List of components that appeared in the top 10 month-over-month percent change in price of each month,
     sorted by occurrance.