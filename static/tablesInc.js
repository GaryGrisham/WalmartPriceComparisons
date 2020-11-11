var query = "http://127.0.0.1:5000/api/toptenpriceincrease"

d3.json(query).then((data) => {
    console.log(data);

// var tbody = d3.select("tbody");

// // Console.log the inc data from data.js
// // console.log(waldata);

// // Step 1: Loop Through `data` and console.log each object
// data.forEach(function(inc){
//     console.log(inc)
//     var row = tbody.append('tr');
//     var row2 = tbody.append('tr');

//     Object.entries(inc).forEach( function([x,y]){
//         console.log(`x is ${x} y is ${y}`)
//         row.append('td').text(y);
//         row2.append('td').text('    ')
//     })

// });
