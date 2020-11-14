var TopTenIncQuery = "http://127.0.0.1:5000/api/toptenpriceincrease"
var TopTenDecQuery = "http://127.0.0.1:5000/api/toptenpricedecrease"

function init() {

// Find the top ten increases
d3.json(TopTenIncQuery).then((incData) => {

var tbody = d3.select("#tbody1");

// Step 1: Loop Through `data` and console.log each object
incData.forEach(function(inc){
    var row = tbody.append('tr');

    Object.entries(inc).forEach( function([x,y]){
        if (x == 'PriceDiff'){
            row.append('td').text("$" + y);
        }
        else {
            row.append('td').text(y);
        };
    })
});
});

// Find the top ten decreases
d3.json(TopTenDecQuery).then((decData) => {

    var tbody = d3.select("#tbody2");
    
    // Step 1: Loop Through `data` and console.log each object
    decData.forEach(function(dec){
        var row = tbody.append('tr');
    
        Object.entries(dec).forEach( function([x,y]){
            if (x == 'PriceDiff'){
                row.append('td').text("$" + y);            
            }
            else {
                row.append('td').text(y);
            };
            
        })
    });
    });
}
  

// Initialize the dashboard
init();
