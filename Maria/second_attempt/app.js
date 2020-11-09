query = 'http://127.0.0.1:5000/api/datacall'
var queryUrl = "http://127.0.0.1:5000/api/categorycounts"

function init() {
  // Select the dropdown
  var categorySelector = d3.select('#selCategory');
    d3.json(queryUrl).then((data) => {
      console.log(data);
      var products = data;
      products.forEach((data) => { 
        categorySelector.append("option").text(data.Category); 
        console.log(d3.select("#selCategory").property("value"))
      })
      d3.json(query).then((totalData) => {
        console.log(totalData);
        // This is where I need to filter the data so only the products from the selected category appear
        totalData => totalData.filter(totalData.category == d3.select('#selCategory'))
        console.log(totalData.filter(totalData.category == 'Toys '))
      });
    

  // Use the D3 library to read in samples.json.
  // d3.json(query).then((totalData) => {
  //   console.log(totalData);
  //   // This is where I need to filter the data so only the products from the selected category appear
  //   totalData => totalData.filter(totalData.category == d3.select('#selCategory'))
  //   console.log(totalData.filter(totalData.category == 'Toys'))
  // };
    // Select the default subject in the dropdown & charts on page load 
    var defaultProduct = data[0];
    console.log(defaultProduct.product_name)
    
    // Product Info
    // --------------------------------------------
    var metaPanel = d3.select("#product-metadata"); 
    metaPanel.append("span").text(defaultProduct.category).classed("badge badge-success",true);
    metaPanel.append("h5").text(defaultProduct.product_name).classed("card-title",true);
    metaPanel.append("p").text(`ITEM #: ${defaultProduct.item_number}`).classed("card-text",true);
    metaPanel.append("p").text(`BRAND: ${defaultProduct.brand}`).classed("card-text",true);
    metaPanel.append("button").text("View Product").attr("xlink:href", defaultProduct.product_url).classed("btn btn-primary",true);
    
    // Product Price
    // --------------------------------------------
    var priceOne = d3.select("#priceOne"); 
    priceOne.append("h2").text(`$${defaultProduct.price_2019}`);
    var priceTwo = d3.select("#priceTwo"); 
    priceTwo.append("h2").text(`$${defaultProduct.price_2020}`);

    // 2019 Bar
    var svgOne = d3.select("#svgOne")
    svgOne.append("div")
        .data([defaultProduct.price_2019])
        .attr("height", 20)
        .style("width", (defaultProduct.price_2019 * 2) + "px")
        .style('background-color', '#f80')
        .text("2019")
        .classed("firstbar",true);

    // 2020 Bar
    var svgTwo = d3.select("#svgTwo")
    svgTwo.append("div")
      .data([defaultProduct.price_2020])
      .attr("height", 20)
      .style("width", (defaultProduct.price_2020 * 2) + "px")
      .style('background-color', '#93c')
      .text("2020")
      .classed("firstbar",true);

    // Product Comparison
    // --------------------------------------------
    var priceCompNum = parseFloat((defaultProduct.price_2020 - defaultProduct.price_2019).toFixed(2))
    if (priceCompNum > 0) {
      var changeLabel = "⇧";
    }
    else if (priceCompNum < 0) {
      var changeLabel = "⇩";
    }
    else {
      var changeLabel = "";
    }
    var priceComp = d3.select("#pricecomp"); 
    priceComp.append("span").text(`${changeLabel} $${priceCompNum}`);
  });



// Function to update the Demographic Info 
function updateMetadata(product) {
  
// Use the D3 library to read in samples.json.
  d3.json(query).then((data) => {
    console.log(data);
    var filterList = data.filter(productsObject => productsObject.product_name == product);
    var result = filterList[0];

    // Update Product Info
    // --------------------------------------------
    var metaPanel = d3.select("#product-metadata");  
    metaPanel.html("");
    metaPanel.append("span").text(result.category).classed("badge badge-success",true);
    metaPanel.append("h5").text(result.product_name).classed("card-title",true);
    metaPanel.append("p").text(`ITEM #: ${result.item_number}`).classed("card-text",true);
    metaPanel.append("p").text(`BRAND: ${result.brand}`).classed("card-text",true);
    metaPanel.append("a").text("View Product").attr("xlink:href", result.product_url).classed("btn btn-primary",true);

    // Update Product Price
    // --------------------------------------------
    var price_2019 = parseFloat(result.price_2019).toFixed(2)
    var price_2020 = parseFloat(result.price_2020).toFixed(2)
    
    
    var priceOne = d3.select("#priceOne");
    priceOne.html(""); 
    priceOne.append("h2").text(`$${price_2019}`);
    var priceTwo = d3.select("#priceTwo");
    priceTwo.html(""); 
    priceTwo.append("h2").text(`$${price_2020}`);

    // Update 2019 Bar
    var svgOne = d3.select("#svgOne")
    svgOne.html(""); 
    svgOne.append("div")
      .data(price_2019)
      .attr("height", 20)
      .style("width", (price_2019 * 2) + "px")
      .style('background-color', '#f80')
      .text("2019")
      .classed("firstbar",true);

    // Update 2020 Bar
    var svgTwo = d3.select("#svgTwo")
    svgTwo.html(""); 
    svgTwo.append("div")
      .data(price_2019)
      .attr("height", 20)
      .style("width", (price_2020 * 2) + "px")
      .style('background-color', '#93c')
      .text("2020")
      .classed("firstbar",true);

    // Update Product Comparison
    // --------------------------------------------
    var priceCompNum = parseFloat((result.price_2020 - result.price_2019).toFixed(2));
    if (priceCompNum > 0) {
      var changeLabel = "⇧";
    }
    else if (priceCompNum < 0) {
      var changeLabel = "⇩";
    }
    else {
      var changeLabel = "";
    };    
    var priceComp = d3.select("#pricecomp"); 
    priceComp.html(""); 
    priceComp.append("span").text(`${changeLabel} $${priceCompNum}`);
    
  });
  }


// Function to update subject in the dropdown & charts on select
function optionChanged(selectSubject) {
  // updateCharts(selectSubject);
  updateMetadata(selectSubject);
};
};

// Initialize the dashboard
init()