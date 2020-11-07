// This URL Runs the Query to get Product Counts For each Category
var queryUrl = "http://127.0.0.1:5000/api/categorycounts"
//Import data
d3.json(queryUrl).then(function(item) {
    categories = [] 
    product_counts = []
    
      for (var i = 0; i < item.length; i++) {
              // Add all the Categories and Counts to arrays for the Graph
              categories.push(item[i].Category)
              product_counts.push(item[i].Item_Count)
      }
    
    
    
});

// could create bubble chart with 2019 and 2020 layer info
//multiple traces would be needed
