window.onload = function () {
    var query = 'http://127.0.0.1:5000/api/datacall';

    // Function to find the min, q1, q3, max, and median for a given array
    function QuartCalc(d) {
        q1 = d3.quantile(d.map(function(g) { return g;}).sort(d3.ascending),.25)
        median = d3.quantile(d.map(function(g) { return g;}).sort(d3.ascending),.5)
        q3 = d3.quantile(d.map(function(g) { return g;}).sort(d3.ascending),.75)
        interQuantileRange = q3 - q1
        min = q1 - 1.5 * interQuantileRange
        max = q3 + 1.5 * interQuantileRange
        return([min, q1, q3, max, median])
      }

    // Import Data
    d3.json(query).then(function(AllData) {
        // Find unique category values
        function UniqueVal(item, index, self) {
            return self.indexOf(item) === index;
          }
        
        AllCategories = [];
        for (var i = 0; i < AllData.length; i++) {
            AllCategories.push(AllData[i].category);
        }
        categories = AllCategories.filter(UniqueVal);

        // Array to hold dictionaries of percent price changes and outliers
        var plotData = []
        var  outliers = []
        for (let i = 0; i < categories.length ; i++) {
            var dataDict = {};
            categoryPriceChange = [];
            for (let j = 0; j < AllData.length; j++){
                if (AllData[j].category == categories[i]){
                    categoryPriceChange.push(AllData[j].price_percent_change);
                }    
            };
            dataDict['x'] = i;
            dataDict["label"] = categories[i];
            dataDict['y'] = QuartCalc(categoryPriceChange);
            plotData.push(dataDict);
            for (k=0; k < categoryPriceChange.length; k ++){
                if((categoryPriceChange[k] > QuartCalc(categoryPriceChange)[3]) ||  (categoryPriceChange[k] < QuartCalc(categoryPriceChange)[0])){
                    outliers.push({'x': i, 'label': categories[i], 'y': categoryPriceChange[k]});

            };
        };
        };
    // format chart
    var options = {
        animationEnabled: true,
        theme: "dark2", // "light1", "light2", "dark1", "dark2"
        title: {
            text: "Price Change per Category "
        },
        subtitles: [{
            text: "Looks at the Percent Price Change by Category and Any Outliers Within Each Category",
            fontSize: 15
        }],
        axisX: {
            labelAngle: 45
        },
        axisY: {
            title: "Percent Price Change",
            tickLength: 0,
            gridDashType: "dash"
        },
        legend: {
            cursor: "pointer",
            itemclick: toggleDataSeries
        },

        // build chart
        data: [{
            type: "boxAndWhisker",
            toolTipContent: "<span style=\"color:#6D78AD\">{label}:</span> <br><b>Upper Extreme:</b> {y[3]},<br><b>Q3:</b> {y[2]},<br><b>Median:</b> {y[4]}<br><b>Q1:</b> {y[1]}<br><b>Lower Extreme:</b> {y[0]}",
            dataPoints: plotData,         
                
        },
        {
            type: "scatter",
            name: "Outlier Values",
            color: "#F15278",
            markerType: "circle",
            toolTipContent: "<span style=\"color:#C0504E\">{county}</span>{y} %",
            showInLegend: true,
            dataPoints:  outliers
        }
    ]

    };
    $("#chartContainer").CanvasJSChart(options);
    
    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }
    });
}
