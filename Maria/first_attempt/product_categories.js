// This URL Runs the Query to get Product Counts For each Category
var queryUrl = "http://127.0.0.1:5000/api/categorycounts"

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

