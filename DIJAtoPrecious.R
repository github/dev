#Source Code
#Install all packages

#install.packages("shiny")

#install.packages("shinydashboard")

#install.packages("stringi")

#install.packages("stringr")

#install.packages("ggplot2")

#install.packages("DT")

#Load all Libraries

library(shiny)

library(shinydashboard)

library(htmltools)

library(stringi)

library(stringr)

library(ggplot2)

library(DT)

#Create all functions

metalTableLoad <- function(){
  
  metalPriceDataFrame <- read.csv("MetalsData.csv")
  
  metalPriceDataFrame$Date <- as.Date(metalPriceDataFrame$Date, format = "%m/%d/%Y")
  
  return(metalPriceDataFrame)
  
}

averageTableLoad <- function(){
  
  averagePriceDataFrame <- read.csv("AverageCloseData.csv")
  
  averagePriceDataFrame$Date <- as.Date(averagePriceDataFrame$Date, format = "%m/%d/%Y")
  
  return(averagePriceDataFrame)
  
}

#Create the User Interface

ui <- dashboardPage(
  
  dashboardHeader(title = "Metals Price Dashboard"),
  
  dashboardSidebar(
    
    sidebarMenu(
      
      menuItem("Precious Metals Price Line Chart", tabName = "metalsLineChart", icon = icon("chart-line"))
      
    ),
    
    radioButtons("timeLineSelection", label = h3("Timeline Selection", align = "center", style = "text-decoration:underline; font-family:serif; margin-left: 10px; margin-bottom: 20px; margin-top: 8px"), choices = list("Year-To-Date" = 1, "1 Month" = 2, "6 Months" = 3, "1 Year" = 4, "5 Years" = 5, "All Years" = 6), selected = 1),
    
    br(),br(),
    
    h3("Precious Metals Selection", align = "center", style = "text-decoration:underline; font-family:serif;"),
    
    checkboxInput("goldBox", label = "Gold Close Price", value = TRUE),
    
    checkboxInput("platinumBox", label = "Platinum Close Price", value = TRUE),
    
    checkboxInput("palladiumBox", label = "Palladium Close Price", value = TRUE),
    
    checkboxInput("silverBox", label = "Silver Close Price", value = TRUE),
    
    checkboxInput("averageBox", label = "Dow Jones Close Price", value = TRUE)
    
  ),
  
  dashboardBody(
    
    tabItems(
      
      tabItem(tabName = "metalsLineChart",
              
              h1("Precious Metals Closing Prices Analysis", align = "center", style = "text-decoration:none; font-family:serif; font-weight:bold; color:black; margin: 0"),
              
              div(style = "border: 3px solid black", plotOutput("metalsLineChart", height = 700)),
              
              br(),
              
              div(style = "display: flex; background: #FCFCFC; color: black; font-weight: bold; border: 3px solid black",
                  
                  div(style = "border-right: 30px solid white;", h3("Metals Closing Prices Table"), DT::dataTableOutput("metalsTable")),
                  
                  div(style = "", h3("Dow Jones Average Closing Price Table"), DT::dataTableOutput("averageTable")),
                  
              )
              
      )
      
    )
    
  )
  
)

#Create the server

server <- function(input,output){
  
  output$metalsLineChart <- renderPlot({
    
    metalsDataFrame <- metalTableLoad()
    
    averageDataFrame <- averageTableLoad()
    
    if(input$timeLineSelection == 1){
      
      datebreaks <- seq(as.Date("2023-01-1"), as.Date("2023-03-22"), by = "10 days")
      
      dateRange <- c("2023-01-1", "2023-03-22")
      
    }
    
    if(input$timeLineSelection == 2){
      
      datebreaks <- seq(as.Date("2023-02-22"), as.Date("2023-03-22"), by = "5 day")
      
      dateRange <- c("2023-02-22", "2023-03-22")
      
    }
    
    if(input$timeLineSelection == 3){
      
      datebreaks <- seq(as.Date("2022-09-22"), as.Date("2023-03-22"), by = "2 week")
      
      dateRange <- c("2022-09-22", "2023-03-22")
      
    }
    
    if(input$timeLineSelection == 4){
      
      datebreaks <- seq(as.Date("2022-03-22"), as.Date("2023-03-22"), by = "1 month")
      
      dateRange <- c("2022-03-22", "2023-03-22")
      
    }
    
    if(input$timeLineSelection == 5){
      
      datebreaks <- seq(as.Date("2018-03-22"), as.Date("2023-03-22"), by = "1 year")
      
      dateRange <- c("2018-03-22", "2023-03-22")
      
    }
    
    if(input$timeLineSelection == 6){
      
      datebreaks <- seq(as.Date("2013-03-25"), as.Date("2023-03-22"), by = "1 year")
      
      dateRange <- c("2013-03-25", "2023-03-22")
      
    }
    
    basePlot <- ggplot(metalsDataFrame, aes(x=Date))+ scale_x_date(limits = as.Date(dateRange), breaks = datebreaks, date_labels = "%m-%d-%Y")
    
    metalColors <-
      
      metalLabel <- c()
    
    numberOfMetals <- c()
    
    if(input$goldBox == TRUE){
      
      basePlot <- basePlot + geom_line(aes(y = GoldClose, color = "Gold"), linewidth = 2)
      
      metalLabel <- append(metalLabel, "Gold")
      
    }
    
    if(input$platinumBox == TRUE){
      
      basePlot <- basePlot + geom_line(aes(y = PlatinumClose, color = "Platinum"), linewidth = 2)
      
      metalLabel <- append(metalLabel, "Platinum")
      
    }
    
    if(input$palladiumBox == TRUE){
      
      basePlot <- basePlot + geom_line(aes(y = PalladiumClose, color = "Palladium"), linewidth = 2)
      
      metalLabel <- append(metalLabel, "Palladium")
      
    }
    
    if(input$silverBox == TRUE){
      
      basePlot <- basePlot + geom_line(aes(y = SilverClose, color = "Silver"), linewidth = 2)
      
      metalLabel <- append(metalLabel, "Silver")
      
    }
    
    if(input$averageBox == TRUE){
      
      basePlot <- basePlot + geom_line(data = averageDataFrame, aes(x = Date, y = AverageClose, color = "Dow Jones Average"), linewidth = 2)
      
      metalLabel <- append(metalLabel, "Average")
      
    }
    
    basePlot + labs(title = "Closing prices", x = "Date", y = "Closing Price in Dollars") + theme_light() +
      
      scale_color_manual(name = "Precious Metal",
                         
                         values = c("Gold" = "gold", "Platinum" = "purple", "Palladium" = "lightgreen", "Silver" = "gray", "Dow Jones Average" = "red"),
                         
                         labels = waiver(),
                         
                         drop = TRUE)+
      
      theme(legend.position = "bottom",
            
            legend.key = element_blank(),
            
            legend.key.size = unit(1, "cm"),
            
            legend.key.height = unit(1, "cm"),
            
            legend.title = element_text(size = 20, face = "bold"),
            
            legend.text = element_text(size = 20),
            
            axis.text.y = element_text(size = 12.5, face = "bold", color = "white", angle = 45),
            
            axis.title.y = element_text(size = 18, face = "bold", color = "white"),
            
            axis.text.x = element_text(size = 12.5, face = "bold", color = "white"),
            
            axis.title.x = element_text(size = 18, face = "bold", color = "white"),
            
            plot.title = element_text(face = "bold", size = 30,hjust = 0.5, color = "white"),
            
            plot.subtitle = element_text( size = 15, face = "italic", hjust = 0.5, color = "white"),
            
            plot.background = element_rect(fill = "#3c8dbc")
            
      )+
      
      labs(x = "\nDate",
           
           y = "\nClosing price\n",
           
           title = "Precious Metals vs the Dow Jones Industrial Average",
           
           subtitle = "Comparing Gold, Silver, Palladium, and Platinum to the DJIA")+
      
      scale_y_continuous(labels = scales::dollar_format())
    
  })
  
  output$metalsTable <- DT::renderDataTable({
    
    metalsDataFrame <- metalTableLoad()
    
    metalsDataFrame
    
  })
  
  output$averageTable <- DT::renderDataTable({
    
    averageDataFrame <- averageTableLoad()
    
    averageDataFrame
    
  })
  
}

#Create the shiny app

shinyApp(ui = ui, server = server)
