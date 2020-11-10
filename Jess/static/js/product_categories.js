// This URL Runs the Query to get Product Counts For each Category
var queryUrl = "http://127.0.0.1:5000/api/categorycounts"
var avgpriceUrl = "http://127.0.0.1:5000/api/categoryavgprice"
var toptenUrl = "http://127.0.0.1:5000/api/toptenpriceincrease"
var allsqlUrl = "http://127.0.0.1:5000/api/walmartdata"
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
    // Import Data
d3.json(toptenUrl).then(function(item) {
  bar1 = [] 
  bar2 = []
  
  
    for (var i = 0; i < item.length; i++) {
            // Add all the Categories and Counts to arrays for the Graph
            bar1.push({y: item[i].PriceDiff, label: item[i].ProductName})
  
  
    
    }
    var chart = new CanvasJS.Chart("topten", {
      animationEnabled: true,
      title:{
        text: "Top 10 Products with largest Price Difference",
        fontFamily: "Calibri",
        fontSize: 20
      },
      axisY: {
        title: "Price Change",
        includeZero: true,
        labelFontSize: 12,
        titleFontSize: 16
      },
      axisX: {
 
        labelFontSize: 12,
        titleFontSize: 16
      },      
      legend: {
        cursor:"pointer",
        itemclick : toggleDataSeries,
        fontSize: 16
      },
      toolTip: {
        shared: true,
        content: toolTipFormatter
      },
      data: [{
        type: "bar",
        showInLegend: true,
        name: "Price Change",
        color: "gold",
        dataPoints: bar1
      },

        ]
      
    });
    chart.render();
    
    function toolTipFormatter(e) {
      var str = "";
      var total = 0 ;
      var str3;
      var str2 ;
      for (var i = 0; i < e.entries.length; i++){
        var str1 = "<span style= \"color:"+e.entries[i].dataSeries.color + "\">" + e.entries[i].dataSeries.name + "</span>: <strong>"+  (Math.round(e.entries[i].dataPoint.y * 100) / 100).toFixed(2) + "</strong> <br/>" ;

        str = str.concat(str1);
      }
      str2 = "<strong>" + e.entries[0].dataPoint.label + "</strong> <br/>";

      return (str2.concat(str));
    }
    
    function toggleDataSeries(e) {
      if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      }
      else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }
    
    

  
    });
    //pricechange bar graph
    d3.json(allsqlUrl).then(function(item) {
      greaterthan = 0
      lessthan = 0
      same = 0

  
      
      
        for (var i = 0; i < item.length; i++) {
                //if price 2020 greater than 2019 greaterthan goes up by 1
                if (item[i]["2020_Price"] > item[i]["2019_Price"]){
                  greaterthan = greaterthan +1;
                }

                //if price 2020 less than 2019 lessthan goes up by 1
                else if (item[i]["2020_Price"] < item[i]["2019_Price"]){
                  lessthan = lessthan +1;
                }
                // If Nothing is True add one to same
                else {
                  same = same +1;
                }

        
        }
      
          // The bar chart
      
                  var greaterthantrace = {
                    x: "Increased",
                    y: greaterthan,
                    name: "Product Count",
                    type: "bar"
      
                };
                var lessthantrace = {
                  x: "Decreased",
                  y: lessthan,
                  name: "Product Count",
                  type: "bar"
    
              };
              var sametrace = {
                x: "No Change",
                y: same,
                name: "Product Count",
                type: "bar"
  
            };
                var bardata2 = [greaterthantrace, lessthantrace, sametrace];
                
            // set the layout for the bar plot
                
                var barlayout2 = {
                    height: 600,
                    width: 900,
                    title: {
                      text:'Price Differences from 2019 to 2020',
                      font: {
                        family: 'Calibri',
                        size: 24
                      },
                    },
                    barmode: 'group'
                };
                
              // create the bar plot
                
                Plotly.newPlot("bar2", bardata2, barlayout2);
      
        });