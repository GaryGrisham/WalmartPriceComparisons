dataset = d3.json('http://127.0.0.1:5000/api/datacall');


function addOption(){
    d3.json('http://127.0.0.1:5000/api/datacall').then(function(data, i){
     
      data.result.filter(function(product){
        
        var select = document.getElementById('selDataset');
        var option = document.createElement('option');
        option.value = product.item_number;
        option.innerHTML = product.item_number;
        select.appendChild(option);
        });

    });
};
addOption();

d3.selectAll("#selDataset").on("change", dashboardInfo);

function dashboardInfo(){
    d3.json('http://127.0.0.1:5000/api/datacall').then(function(data, i){
        var idSelected = d3.select("#selDataset").property("value");
        itemData = data.result.filter(product => product.item_number === idSelected);
        var tableData = data.result.filter(product => product.item_number === idSelected);
        console.log(tableData);
        var tableLoc = d3.select("#sample-metadata");
        tableLoc.html("");
        Object.entries(data.result.filter(product => product.item_number === idSelected)).forEach(function([key,value]){
            console.log(key, value)
        tableLoc.append('p').text(`${key} : ${value}`)
        });
    })
};

dashboardInfo()