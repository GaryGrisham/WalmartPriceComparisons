window.onload = function () {
    var subjectSelector = d3.select("#chartContainer");
    var options = {
        animationEnabled: true,
        theme: "dark2", // "light1", "light2", "dark1", "dark2"
        title: {
            text: "Air Quality Index Comparision of Few Popular State"
        },
        subtitles: [{
            text: "Based on Number of Days PM2.5 Pollutant Found at Atmosphere in 2016 with County as Sample",
            fontSize: 15
        }],
        axisY: {
            title: "Number of Days",
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
                { x: 0, label: "California", y: [-124.25, 46, 159.5, 329.75, 124.5] },
                { x: 1, label: "Florida", y: [-226.5, 0, 151, 377.5, 123] },
                { x: 2, label: "Indiana", y: [-330, 0, 220, 550, 75.5] },
                { x: 3, label: "New York", y: [-191.25, 0, 127.5, 318.75, 55] },
                { x: 4, label: "Washington", y: [-20, 211, 365, 596, 346] }
            ]
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
    
    }