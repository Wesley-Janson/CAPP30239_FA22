####
#' Project: Data Viz Final Project-Top 10 Prices and Weights
#' Title: top_prices_weights.R
#' Author(s): Wesley Janson
#' Last Edited: 10/30/2022
#' Description: Filter data to create end-use CSVs for analysis
####

##### Check for needed packages, install if needed and load in
check.packages<-function(pkg){
  new.pkg<-pkg[!(pkg %in% installed.packages()[, "Package"])]
  if (length(new.pkg))
    install.packages(new.pkg, dependencies=TRUE)
  sapply(pkg, require, character.only=TRUE)
}
packages_needed<-c("tidyverse","entropy","Dict")
check.packages(packages_needed)

setwd("/Users/wrjanson/Documents/UChicago/CAPP30239_FA22/week_03/")  # Set your working directory

prices <- read_csv("prices.csv")
weights <- read_csv("weights.csv")

weights <- weights[weights$Date>="2012-07-01",]
covid_weights <- weights[weights$Date>="2020-01-01",]
prices <- prices[prices$Date>="2011-07-01",]
covid_prices <- prices[prices$Date>="2019-01-01",]

### Most Common Top Weights ###
top_weights <- Dict$new(
  "Owner-occupied stationary homes" = 0L,
  .class = "integer",
  .overwrite = TRUE
)

for (i in 1:nrow(weights)) {
  row_i <- weights[i,-1]
  
  x <- sort(as.data.frame(t(row_i))$V1, decreasing = TRUE)[1:10]
  
  for (m in x) {
    k <- names(row_i)[which(row_i == m, arr.ind=T)[, "col"]]
    
    if (top_weights$has(k)) {
      top_weights[k] <- as.integer(top_weights[k])+1L
    } else {
      top_weights[k] <- 1L
    }
  }
}

##### Dataframe of Top Weights by occurrence
component <- c()
num_occurrances <- c()
for (i in 1:length(top_weights$keys)) {
  component <- c(component, as.character(top_weights$keys[i]))
  num_occurrances <- c(num_occurrances, as.numeric(top_weights$values[i]))
}

top_weights_df <- as.data.frame(cbind(component, num_occurrances))
top_weights_df$num_occurrances <- as.numeric(top_weights_df$num_occurrances)
top_weights_df <- top_weights_df[order(-top_weights_df$num_occurrances),]

write_csv(top_weights_df, "most_occur_top_weights.csv")

##### Average weight for each good in the past 10 years
avg_weights <- weights[,-1] %>% 
  summarise_all(funs(mean))
avg_weights10 <- avg_weights[which(avg_weights %in% sort(as.data.frame(t(avg_weights))$V1, 
                                                         decreasing = TRUE)[1:10])]
avg_weights10 <- avg_weights10 %>%
  pivot_longer(cols = c(1:10), names_to = "Component", values_to = "Average Weight")
write_csv(avg_weights10,"avg_weights_top10.csv")

########################################################
##### Prices

### Monthly change in prices
month_pct_change <- as.data.frame(cbind(prices[-1,1],percentChange(ts(prices[,-1]), lag = 1)/100))

### Year-over-year change in prices
ann_pct_change <- as.data.frame(cbind(prices[-c(1:12),1],percentChange(ts(prices[,-1]), lag = 12)/100))


### Highest Average Price Changes
# Monthly
avg_prices <- month_pct_change[,-1] %>% 
  summarise_all(funs(mean))
avg_prices10 <- avg_prices[which(avg_prices %in% sort(as.data.frame(t(avg_prices))$V1, 
                                                         decreasing = TRUE)[1:10])]
avg_prices10_monthly <- avg_prices10 %>%
  pivot_longer(cols = c(1:10), names_to = "Component", values_to = "Average Percent Change")
write_csv(avg_prices10_monthly,"avg_prices10_monthly.csv")

# Annual
avg_prices <- ann_pct_change[,-1] %>% 
  summarise_all(funs(mean))
avg_prices10 <- avg_prices[which(avg_prices %in% sort(as.data.frame(t(avg_prices))$V1, 
                                                      decreasing = TRUE)[1:10])]
avg_prices10_annual <- avg_prices10 %>%
  pivot_longer(cols = c(1:10), names_to = "Component", values_to = "Average Percent Change")
write_csv(avg_prices10_annual,"avg_prices10_annual.csv")


### Most Common Top Price Changes ###
top_prices <- Dict$new(
  "Fuel oil" = 0L,
  .class = "integer",
  .overwrite = TRUE
)

for (i in 1:nrow(ann_pct_change)) {
  row_i <- ann_pct_change[i,-1]
  row.names(row_i)<-"V1"
  x <- sort(as.data.frame(t(row_i))$V1, decreasing = TRUE)[1:10]
  
  for (m in x) {
    k <- names(row_i)[which(row_i == m, arr.ind=T)[, "col"]]
    
    if (top_prices$has(k)) {
      top_prices[k] <- as.integer(top_prices[k])+1L
    } else {
      top_prices[k] <- 1L
    }
  }
}

component <- c()
num_occurrances <- c()
for (i in 1:length(top_prices$keys)) {
  component <- c(component, as.character(top_prices$keys[i]))
  num_occurrances <- c(num_occurrances, as.numeric(top_prices$values[i]))
}

top_prices_df <- as.data.frame(cbind(component, num_occurrances))
top_prices_df$num_occurrances <- as.numeric(top_prices_df$num_occurrances)
top_prices_df <- top_prices_df[order(-top_prices_df$num_occurrances),]

write_csv(top_prices_df, "most_occur_top_prices_annual.csv")




### Most Common Top Price Changes ###
top_prices <- Dict$new(
  "Fuel oil" = 0L,
  .class = "integer",
  .overwrite = TRUE
)

for (i in 1:nrow(month_pct_change)) {
  row_i <- month_pct_change[i,-1]
  row.names(row_i)<-"V1"
  x <- sort(as.data.frame(t(row_i))$V1, decreasing = TRUE)[1:10]
  
  for (m in x) {
    k <- names(row_i)[which(row_i == m, arr.ind=T)[, "col"]]
    
    if (top_prices$has(k)) {
      top_prices[k] <- as.integer(top_prices[k])+1L
    } else {
      top_prices[k] <- 1L
    }
  }
}
component <- c()
num_occurrances <- c()
for (i in 1:length(top_prices$keys)) {
  component <- c(component, as.character(top_prices$keys[i]))
  num_occurrances <- c(num_occurrances, as.numeric(top_prices$values[i]))
}

top_prices_df <- as.data.frame(cbind(component, num_occurrances))
top_prices_df$num_occurrances <- as.numeric(top_prices_df$num_occurrances)
top_prices_df <- top_prices_df[order(-top_prices_df$num_occurrances),]

write_csv(top_prices_df, "most_occur_top_prices_monthly.csv")


##### Top Prices post-COVID, and their corresponding weights
### Monthly change in prices
covid_month <- as.data.frame(cbind(covid_prices[-1,1],percentChange(ts(covid_prices[,-1]), lag = 1)/100))

### Year-over-year change in prices
covid_annual <- as.data.frame(cbind(covid_prices[-c(1:12),1],percentChange(ts(covid_prices[,-1]), lag = 12)/100))

avg_weights <- covid_weights[,-1] %>% 
  summarise_all(funs(mean))
avg_weights10 <- avg_weights[which(avg_weights %in% sort(as.data.frame(t(avg_weights))$V1, 
                                                         decreasing = TRUE)[1:10])]

covid_prices10 <- covid_prices %>%
  select(Date, colnames(avg_weights10)) %>%
  filter(Date>"2020-01-01")

covid_prices10 <- as.data.frame(cbind(covid_prices10[,1],apply(covid_prices10[,-1], 2, function(y) 100 * y / y[1])))

covid_prices10 <- covid_prices10 %>%
  pivot_longer(cols = c(2:11), names_to = "Component", values_to = "Index Value")

weights_long <- covid_weights %>%
  pivot_longer(cols=c(2:201), names_to = "Component", values_to = "Weight")

covid_prices10 <- merge(covid_prices10, weights_long, by=c("Date", "Component"))

write_csv(covid_prices10, "covid_prices_weights.csv")


covid_price_change <- as.data.frame(cbind(covid_annual[,1],apply(covid_annual[,-1], 2, function(y) 100 * y / y[1])))
covid_var <- covid_price_change[,-1] %>%
  summarise_all(var)
covid_var10 <- covid_var[which(covid_var %in% sort(as.data.frame(t(covid_var))$V1, 
                                                         decreasing = TRUE)[1:10])]
covid_price_change <- covid_price_change %>%
  select(colnames(covid_var10))



