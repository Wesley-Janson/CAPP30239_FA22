####
#' Project: Data Viz Final Project-PCE Inflation Component Analysis
#' Title: creating_graph_csvs.R
#' Author(s): Wesley Janson
#' Last Edited: 11/24/2022
#' Description: Filter data to create end-use CSVs for analysis
####

##### Check for needed packages, install if needed and load in
check.packages<-function(pkg){
  new.pkg<-pkg[!(pkg %in% installed.packages()[, "Package"])]
  if (length(new.pkg))
    install.packages(new.pkg, dependencies=TRUE)
  sapply(pkg, require, character.only=TRUE)
}
packages_needed<-c("tidyverse","entropy","tfplot")
check.packages(packages_needed)

setwd("/Users/wrjanson/Documents/UChicago/CAPP30239_FA22/final_project/data_cleaning/")  # Set your working directory

prices <- read_csv("prices.csv")
weights <- read_csv("weights.csv")

weights <- weights[weights$Date>="2012-07-01",]
covid_weights <- weights[weights$Date>="2020-01-01",]
prices <- prices[prices$Date>="2011-07-01",]
covid_prices <- prices[prices$Date>="2019-01-01",]

########################################################
##### Top Prices in COVID-19 period, and their corresponding weights

### Monthly change in prices
covid_month <- as.data.frame(cbind(covid_prices[-1,1],percentChange(ts(covid_prices[,-1]), lag = 1)/100))
### Year-over-year change in prices
covid_annual <- as.data.frame(cbind(covid_prices[-c(1:12),1],percentChange(ts(covid_prices[,-1]), lag = 12)/100))


################################################
##### Percentiles of Price Changes-Figure 1 Data
covid_pctiles <- covid_annual %>%
  pivot_longer(cols = -"Date", names_to = "Component", values_to = "Index Value")

weights_long <- covid_weights %>%
  pivot_longer(cols = -"Date", names_to = "Component", values_to = "Weight")

covid_pctiles <- merge(covid_pctiles, weights_long, by=c("Date", "Component"))

all_pctiles_prices <- covid_pctiles %>%
  group_by(Date) %>%
  summarise(p1 = quantile(`Index Value`, 0.01, na.rm = TRUE),
            p25 = quantile(`Index Value`, 0.25, na.rm = TRUE),
            p50 = quantile(`Index Value`, 0.5, na.rm = TRUE),
            p75 = quantile(`Index Value`, 0.75, na.rm = TRUE),
            p99 = quantile(`Index Value`, 0.99, na.rm = TRUE),
            avg = mean(`Index Value`, na.rm = TRUE))

colnames(all_pctiles_prices) <- c("Date", "1st Percentile", "25th Percentile", "Median", "75th Percentile", "99th Percentile", "Average")
all_pctiles_prices <- all_pctiles_prices %>%
  pivot_longer(cols = -"Date", names_to = "measure", values_to = "Value")
all_pctiles_prices$Value <- 100*all_pctiles_prices$Value
all_pctiles_prices <- all_pctiles_prices[,c(2,1,3)]
all_pctiles_prices$Date <- substr(all_pctiles_prices$Date, 1, 7)

write_csv(all_pctiles_prices, "../pctile_prices.csv")


####################################################
##### Top 10 Highest Weighted Goods and Services and their 
##### Price Changes-Figure 2 Data
avg_weights <- covid_weights[,-1] %>% 
  summarise_all(funs(mean))
avg_weights10 <- avg_weights[which(avg_weights %in% sort(as.data.frame(t(avg_weights))$V1, 
                                                         decreasing = TRUE)[1:10])]

covid_prices10 <- covid_prices %>%
  select(Date, colnames(avg_weights10)) %>%
  filter(Date>"2020-01-01")

covid_prices10 <- as.data.frame(cbind(covid_prices10[,1],apply(covid_prices10[,-1], 2, function(y) 100 * y / y[1])))
colnames(covid_prices10) <- c("date","New Light Trucks","Gasoline/Fuel","Prescription Drugs","Rented Housing",
                              "Owned Housing","Physician Services","Goodwill Medical Services","Purchased Meals",
                              "Health Insurance (Net)","Goodwill Services")
write_csv(covid_prices10, "../covid_prices.csv")


####################################################
##### Most volatile Goods and Services-Figure 3 Data
high_vars <- covid_month[,-1] %>% 
  summarise_all(funs(var))
high_vars10 <- high_vars[which(high_vars %in% sort(as.data.frame(t(high_vars))$V1, 
                                                         decreasing = TRUE)[1:10])]
high_var_price <- covid_prices %>%
  select(Date, colnames(high_vars10)) %>%
  filter(Date>"2020-01-01")
high_var_price <- as.data.frame(cbind(high_var_price[,1],apply(high_var_price[,-1], 2, function(y) 100 * y / y[1])))

# Only keep top 6
high_var_price <- high_var_price[,1:7]
colnames(high_var_price) <- c("Date", "Gasoline/Fuel", "Fuel/Oil", "Film/Photo Supplies", "Motor Vehicle Rental", "Air Transportation", "Primary School Lunches")

test <- high_var_price[,1:2]

overlap_data <- data_frame(Base=numeric(), Max=numeric(), Current=numeric(), Component=character())
for (i in 2:length(high_var_price)) {
  colm <- high_var_price[,i]
  current <- (colm[length(colm)]-100)*0.01
  max_dev <- colm[which((abs(100-colm))==max(abs(100-colm)))]
  if (max_dev < 100) {
    max_dev <- (100 - max_dev)*-0.01 
  } else {
    max_dev <- (max_dev - 100)*0.01
  }
  
  overlap_data <- rbind(overlap_data, c(1, max_dev, current, colnames(high_var_price)[i]))
}
colnames(overlap_data) <- c("Base","Max","Current","Component")


write_csv(overlap_data, "../overlap_circles.csv")


