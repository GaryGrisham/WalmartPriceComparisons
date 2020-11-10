// This URL Runs the Query to get Product Counts For each Category
var queryUrl = "http://127.0.0.1:5000/api/categorycounts"
var avgpriceUrl = "http://127.0.0.1:5000/api/categoryavgprice"

// Import Data
d3.json(queryUrl).then(function(item) {
categories = [] 
product_counts = []

  for (var i = 0; i < item.length; i++) {
          // Add all the Categories and Counts to arrays for the Graph
          categories.push(item[i].Category)
          product_counts.push(item[i].Item_Count)

  
  }

    // The bubble chart

            var bubbletrace = {
              x: categories,
              y: product_counts,
              mode: "markers",
              marker: {
                size: product_counts,
                color: '#9c3'
            },

          };
          
          var bubbledata = [bubbletrace];
          
      // set the layout for the bubble plot
          
          var bubblelayout = {
              height: 600,
              width: 900,
              title: {
                text:'Product Counts By Category',
                font: {
                  family: 'Calibri',
                  size: 24
                },
              }
          };
          
        // create the bubble plot
          
          Plotly.newPlot("scatter", bubbledata, bubblelayout);

  });

  d3.json(avgpriceUrl).then(function(item) {
    categories = [] 
    price2019 = []
    price2020 = []

    
    
      for (var i = 0; i < item.length; i++) {
              // Add all the Categories and  2019 and 2020 avg prices
              categories.push(item[i].Category)
              price2019.push(item[i]["2019_avg"])
              price2020.push(item[i]["2020_avg"])
    
      
      }
    
        // The bar chart
    
                var bartrace1 = {
                  x: categories,
                  y: price2019,
                  name: "Average 2019 Price",
                  type: "bar"
    
              };
              var bartrace2 = {
                x: categories,
                y: price2020,
                name: "Average 2020 Price",
                type: "bar"
  
            };
              var bardata = [bartrace1, bartrace2];
              
          // set the layout for the bar plot
              
              var barlayout = {
                  height: 600,
                  width: 900,
                  title: {
                    text:'Average Price By Category',
                    font: {
                      family: 'Calibri',
                      size: 24
                    },
                  },
                  barmode: 'group'
              };
              
            // create the bubble plot
              
              Plotly.newPlot("avgbar", bardata, barlayout);
    
      });
