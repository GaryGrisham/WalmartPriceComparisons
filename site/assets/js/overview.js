var data = [17, 83];

var svg = d3.select("svg"),
			width = svg.attr("width"),
			height = svg.attr("height"),
			radius = Math.min(width, height) / 2,
			g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

		var color = d3.scaleOrdinal(['#77b300','#2a9fd6']);

		// Generate the pie
		var pie = d3.pie();

		// Generate the arcs
		var arc = d3.arc()
					.innerRadius(0)
					.outerRadius(radius);

		//Generate groups
		var arcs = g.selectAll("arc")
					.data(pie(data))
					.enter()
					.append("g")
					.attr("class", "arc")

		//Draw arc paths
		arcs.append("path")
			.attr("fill", function(d, i) {
				return color(i);
			})
			.attr("d", arc);