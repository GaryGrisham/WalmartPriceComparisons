function init() {
    // Select the dropdown
    var subjectSelectorCart = d3.select("#selDatasetCart");
    
    // Use the D3 library to read in samples.json.
    d3.json("csvjson.json").then((data) => {
      console.log(data);
      var productsCart = data;
      productsCart.forEach((data) => { 
        subjectSelectorCart.append("option").text(data.product_name); 
      });
        
    });
  }
  
  // Function to update the Demographic Info 
function updateCart(productCart) {
  
    // Use the D3 library to read in samples.json.
      d3.json("csvjson.json").then((data) => {
        console.log(data);
        var filterProductList = data.filter(productsObject => productsObject.product_name == productCart);
        var resultProduct = filterProductList[0];

        var selection = [ { "name": resultProduct.product_name, "price_2019": resultProduct.price_2019, "price_2020": resultProduct.price_2020 } ]; 
        // console.log(selection)

        var items = [];
        var items = selection.concat();
        

        var cart2019 = d3.select("#cart2019"); 
        cart2019.data(items)
            .append("span").text(resultProduct.product_name).classed("prodname",true)
            .append("span").text(resultProduct.price_2019).classed("prodprice",true)

        var cart2020 = d3.select("#cart2020"); 
        cart2020.data(items)
            .append("span").text(resultProduct.product_name).classed("prodname",true)
            .append("span").text(resultProduct.price_2020).classed("prodprice",true)
    
            console.log(items)
    
    });
}

// Function to update subject in the dropdown & charts on select
function optionChangedCart(selectProduct) {
    updateCart(selectProduct);
  }

  


  
  // Initialize the dashboard
  init();
  
  
          