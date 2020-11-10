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
                colorscale: 'Greens',
                color: ['#6610f2','#6f42c1','#e83e8c','#c00','#fd7e14','#f80','#77b300','#20c997','#93c','#2a9fd6','#6610f2','#6f42c1','#e83e8c','#c00','#fd7e14','#f80','#77b300','#20c997']
            },

          };
          
          var bubbledata = [bubbletrace];
          
      // set the layout for the bubble plot
          
          var bubblelayout = {
              height: 500,
              width: 900,
              plot_bgcolor:"#rgba(255,255,255,0)",
              paper_bgcolor:"rgba(255,255,255,0)",
              yaxis: {
                automargin:true,
                tickfont: {
                  color: "#fff",
                  family: 'Roboto,Arial,sans-serif',
                },
                title: {
                  text: "Product Counts",
                  font: { 
                    color: "#ccc",
                  },
                },
                tickcolor: "rgba(255,255,255,0.75)",
                tickwidth: 1,
                
                gridcolor: "rgba(255,255,255,0.25)",
                gridwidth: 1,
                
                zerolinecolor: "#fff",
                zerolinewidth: 1,
              },
              xaxis: {
                automargin:true,
                tickmode: "array",
                tickangle:45,
                tickfont: {
                  color: "#fff",
                  family: 'Roboto,Arial,sans-serif',
                },
                tickcolor: "rgba(255,255,255,0.25)",
                //tickwidth: 100,
                
                gridcolor: "rgba(255,255,255,0.25)",
                gridwidth: 1,      
              },
              // title: {
              //   text:'Product Counts By Category',
              //   font: {
              //     family: 'Roboto,Arial,sans-serif',
              //     size: 24,
              //     color: "#fff"
              //   },
                
              // }
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
                  type: "bar",
                  marker: {
                    color: "#fd7e14"
                  }
    
              };
              var bartrace2 = {
                x: categories,
                y: price2020,
                name: "Average 2020 Price",
                type: "bar",
                marker: {
                  color: "#6f42c1"
                }
  
            };
              var bardata = [bartrace1, bartrace2];
              
          // set the layout for the bar plot
              
              var barlayout = {
                  height: 600,
                  width: 900,
                  plot_bgcolor:"#rgba(255,255,255,0)",
                  paper_bgcolor:"rgba(255,255,255,0)",
                  showlegend: true,
                  legend: {
                    x: 0,
                    y: 1,
                    traceorder: 'normal',
                    font: {
                      family: 'sans-serif',
                      size: 12,
                      color: '#222'
                    },
                    bgcolor: '#E2E2E2',
                    bordercolor: '#FFFFFF',
                    borderwidth: 2
                  },
              yaxis: {
                automargin:true,
                tickfont: {
                  color: "#fff",
                  family: 'Roboto,Arial,sans-serif',
                },
                title: {
                  text: "Average Price ($)",
                  font: { 
                    color: "#ccc",
                  },
                },
                tickcolor: "rgba(255,255,255,0.75)",
                tickwidth: 1,
                
                gridcolor: "rgba(255,255,255,0.25)",
                gridwidth: 1,
                
                zerolinecolor: "#fff",
                zerolinewidth: 1,
              },
              xaxis: {
                automargin:true,
                tickmode: "array",
                tickangle:45,
                tickfont: {
                  color: "#fff",
                  family: 'Roboto,Arial,sans-serif',
                },
                tickcolor: "rgba(255,255,255,0.25)",
                //tickwidth: 100,
                
                gridcolor: "rgba(255,255,255,0.25)",
                gridwidth: 1,      
              },
                  // title: {
                  //   text:'Average Price By Category',
                  //   font: {
                  //     family: 'Calibri',
                  //     size: 24
                  //   },
                  // },
                  barmode: 'group'
              };
              
            // create the bubble plot
              
              Plotly.newPlot("avgbar", bardata, barlayout);
    
      });
