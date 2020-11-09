window.onload = function () {
    var query = "http://127.0.0.1:5000/api/categorycounts";

    // Import Data
    d3.json(query).then(function(data) {
        function UniqueVal(item, index, self) {
            return self.indexOf(item) === index;
          }
        
        AllCategories = [];
        for (var i = 0; i < data.length; i++) {
            AllCategories.push(data[i].category);
        }
          console.log(AllCategories);
          categories = AllCategories.filter(UniqueVal);

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
        axisY: {
            title: "Percent Price Change",
            tickLength: 0,
            gridDashType: "dash"
        },
        legend: {
            cursor: "pointer",
            itemclick: toggleDataSeries
        },

        
        data: [{
            type: "boxAndWhisker",
            toolTipContent: "<span style=\"color:#6D78AD\">{label}:</span> <br><b>Upper Extreme:</b> {y[3]},<br><b>Q3:</b> {y[2]},<br><b>Median:</b> {y[4]}<br><b>Q1:</b> {y[1]}<br><b>Lower Extreme:</b> {y[0]}",
            dataPoints: [
                { x: 0, label: "Sports & Outdoors", y: [-124.25, 46, 159.5, 329.75, 124.5] },
                { x: 1, label: "Food ", y: [-226.5, 0, 151, 377.5, 123] },
                { x: 2, label: "Pets ", y: [-330, 0, 220, 550, 75.5] },
                { x: 3, label: "Party & Occasions ", y: [-191.25, 0, 127.5, 318.75, 55] },
                { x: 4, label: "Premium Beauty ", y: [-20, 211, 365, 596, 346] },
                { x: 0, label: "Beauty ", y: [-124.25, 46, 159.5, 329.75, 124.5] },
                { x: 1, label: "Health ", y: [-226.5, 0, 151, 377.5, 123] },
                { x: 2, label: "Personal Care", y: [-330, 0, 220, 550, 75.5] },
                { x: 3, label: "Baby ", y: [-191.25, 0, 127.5, 318.75, 55] },
                { x: 4, label: "Patio & Garden", y: [-20, 211, 365, 596, 346] }
                
                // x: for (var i=0; i < categories.length; i++){
                //     console.log(i);
                //     console.log(categories[i]);
                //     x: i, label: categories[i], y: 
                // }
            ],
                
        },
        {
            type: "scatter",
            name: "Outlier Values",
            color: "#F15278",
            markerType: "cross",
            toolTipContent: "<span style=\"color:#C0504E\">{county}</span>: {y} Days",
            showInLegend: true,
            dataPoints: [
                { x: 0, label: "California", y: 355, county: "Plumas" },
                { x: 3, label: "New York", y: 351, county: "Nassau" }
            ]
        }]

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
