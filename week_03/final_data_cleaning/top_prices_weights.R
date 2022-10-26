####
#' Project: Data Viz Final Project-Top 10 Prices and Weights
#' Title: top_prices_weights.R
#' Author(s): Wesley Janson
#' Last Edited: 10/25/2022
#' Description: Tabulate the top 10 components based on prices and weights
####

##### Check for needed packages, install if needed and load in
check.packages<-function(pkg){
  new.pkg<-pkg[!(pkg %in% installed.packages()[, "Package"])]
  if (length(new.pkg))
    install.packages(new.pkg, dependencies=TRUE)
  sapply(pkg, require, character.only=TRUE)
}
packages_needed<-c("DBI","RPostgreSQL","tidyverse","entropy","Dict")
check.packages(packages_needed)

setwd("/Users/wrjanson/Documents/UChicago/CAPP30239_FA22/week_03/")  # Set your working directory

prices <- read_csv("prices.csv")
weights <- read_csv("weights.csv")

weights <- weights[weights$Date>="2012-07-01",]
prices <- prices[prices$Date>="2011-07-01",]

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

##### Average weight for each good in the past 10 years
avg_weights <- weights[,-1] %>% 
  summarise_all(funs(mean))
avg_weights10 <- avg_weights[which(avg_weights %in% sort(as.data.frame(t(avg_weights))$V1, 
                                                         decreasing = TRUE)[1:10])]


########################################################
##### Prices

### Monthly change in prices


### Year-over-year change in prices



### Most Common Top Price Changes ###
top_prices <- Dict$new(
  "Tires" = 0L,
  .class = "integer",
  .overwrite = TRUE
)

for (i in 1:nrow(prices)) {
  row_i <- prices[i,-1]
  
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
