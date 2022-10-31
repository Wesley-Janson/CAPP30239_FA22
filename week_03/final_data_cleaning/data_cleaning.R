####
#' Project: Data Viz Final Project
#' Title: data_cleaning.R
#' Author(s): Wesley Janson
#' Last Edited: 10/14/2022
#' Description: Cleans up prices and weights data and exports as CSV
####
check.packages<-function(pkg){
  new.pkg<-pkg[!(pkg %in% installed.packages()[, "Package"])]
  if (length(new.pkg))
    install.packages(new.pkg, dependencies=TRUE)
  sapply(pkg, require, character.only=TRUE)
}
packages_needed<-c("tidyverse", "readxl")

setwd("/Users/wrjanson/Documents/UChicago/CAPP30239_FA22/week_03/final_data_cleaning/")  # Set your working directory

dates <- read_xlsx("full_pce_data.xlsx", sheet = "P,Q,Weights Dates", col_names = FALSE)
colnames(dates) <- "Date"

components <- read_xlsx("full_pce_data.xlsx", sheet = "Component Names", col_names = FALSE)
components <- as.data.frame(t(components))

prices <- read_xlsx("full_pce_data.xlsx", sheet = "P", col_names = FALSE)
colnames(prices) <- components[1,]

weights <- read_xlsx("full_pce_data.xlsx", sheet = "Weights", col_names = FALSE)
weights <- rbind(rep(NA,length(weights)),weights)
colnames(weights) <- components[1,]

#### Finalize both prices and weights CSV files
prices <- cbind(dates, prices)
weights <- cbind(dates, weights)

### Export to CSV
write_csv(prices, "prices.csv")
write_csv(weights, "weights.csv")


