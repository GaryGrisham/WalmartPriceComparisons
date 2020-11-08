query = 'http://127.0.0.1:5000/api/datacall'

window.onload = function init() {
  
    // Function to update the Demographic Info 
    d3.json(query).then((data) => {
      var products = data;
      
      // Array to hold results of the price difference
      priceDiff = []
      priceChange = []
  
      // Loop through each row to minus the 2020 price by 2019 price to get price difference year over year
      products.forEach((data) => { 
          priceDiff.push(parseFloat((data.price_2020 - data.price_2019).toFixed(2))); 
          priceChange.push(((data.price_2020 / data.price_2019) * 100 - 100)); 
      });
      
      // Count how many results in items are positive numbers (Increased)
      var increasedCount = 0;
          for(var i = 0; i < priceDiff.length; ++i){
          if(priceDiff[i] > 0)
          increasedCount++;
      }
  
      // Count how many results in items are negative numbers (Decreased)
      var decreasedCount = 0;
          for(var i = 0; i < priceDiff.length; ++i){
          if(priceDiff[i] < 0)
          decreasedCount++;
      }
  
      // Count how many results in items are 0 (Same)
      var sameCount = 0;
          for(var i = 0; i < priceDiff.length; ++i){
          if(priceDiff[i] === 0)
          sameCount++;
      }
  
      // Count of how many increased by more than 10%
      var increasedChangeLess10 = 0;
          for(var i = 0; i < priceChange.length; ++i){
          if(priceChange[i] > 0 && priceChange[i] < 10)
          increasedChangeLess10++;
      }
      var increasedChange10 = 0;
          for(var i = 0; i < priceChange.length; ++i){
          if(priceChange[i] >= 10)
          increasedChange10++;
      }
  
      // Pie Chart Percentage Calculations
      // Total Count
      var total = increasedChangeLess10 + increasedChange10 + decreasedCount + sameCount;
      // Percentage that increased 0 to 9%
      var pincreasedChangeLess10 = parseFloat((increasedChangeLess10 / total * 100).toFixed(2));
      // Percentage that increased 10+%
      var pincreasedChange10 = parseFloat((increasedChange10 / total * 100).toFixed(2));
      // Percentage that decreased
      var pdecreasedChange = parseFloat((decreasedCount / total * 100).toFixed(2));
      // Percentage that had  no change
      var pnoChange = parseFloat((sameCount / total * 100).toFixed(2));
  
      // Counts
      console.log(priceDiff) // Print the 'price differences' array
      console.log(increasedCount) // Print the increased prices count
      console.log(decreasedCount) // Print the decreased prices count
      console.log(sameCount) // Print the same prices count
  
      console.log(priceChange) // Print the 'price change percentages' array
      console.log(increasedChangeLess10) // Print the increased by 0 to 9% count
      console.log(increasedChange10) // Print the increased by 10% or more count
      console.log(total) // Print the total count of products
      
      // Percentages
      console.log(pincreasedChangeLess10) // Print the increased by 0 to 9% percentage
      console.log(pincreasedChange10) // Print the increased by 10% or more percentage
      console.log(pdecreasedChange) // Print the decreased percentage
      console.log(pnoChange) // Print the no change percentage
  
      // CanvasJS Bar Chart
      // -------------------------------------------------
      var chart = new CanvasJS.Chart("barContainer", {
          animationEnabled: true,
          theme: "dark1", // "light1", "light2", "dark1", "dark2"
          // title:{
          //     text: "Top Oil Reserves"
          // },
          axisY: {
              title: "Product Count"
          },
          data: [{        
              type: "column",  
              showInLegend: false, 
              legendMarkerColor: "grey",
              legendText: "MMbbl = one million barrels",
              dataPoints: [      
                  { y: increasedCount, label: "Increased" },
                  { y: decreasedCount,  label: "Decreased" },
                  { y: sameCount,  label: "No Change" }
              ]
          }]
      });
      chart.render();
      // -------------------------------------------------
  
      // CanvasJS Pie Chart
      // -------------------------------------------------
      var options = {
          // title: {
          //     text: "Website Traffic Source"
          // },
          theme: "dark1",
          data: [{
                  type: "pie",
                  startAngle: 45,
                  showInLegend: "true",
                  legendText: "{label}",
                  indexLabel: "{label} ({y}{per})",
                  // yValueFormatString:"#,##0.#"%"",
                  dataPoints: [
                      { label: "0 to 9% Increase", y: pincreasedChangeLess10, per: "%" },
                      { label: "10%+ Increase", y: pincreasedChange10, per: "%" },
                      { label: "Decrease", y: pdecreasedChange, per: "%" },
                      { label: "No Change", y: pnoChange, per: "%" }
                  ]
          }]
      };
      $("#pieContainer").CanvasJSChart(options);
      // -------------------------------------------------
      
  });
  }
  
  // Initialize the dashboard
  init();
