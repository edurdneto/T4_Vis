var margin = {top: 100, right: 80, bottom: 30, left: 300},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// var parseDate = d3.time.format("%Y%m%d").parse;

var x3 = d3.time.scale()
    .range([0, width]);

var y3 = d3.scale.linear()
    .range([height, 0]);

var color3 = d3.scale.category10();

var xAxis3 = d3.svg.axis()
    .scale(x3)
    .orient("bottom");

var yAxis3 = d3.svg.axis()
    .scale(y3)
    .orient("left");

var line3 = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x3(d.date); })
    .y(function(d) { return y3(d.tweets); });

var svg3 = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  
      
// var filterData3={"RealMadrid":true,"NFL":true,"Palmeiras":true};//cities3 to be shown
var filterData3={"NFL":true,"Barcelona":true,"PSG":true,"NBA":true,"RealMadrid":true,"ChampionsLeague":true,"Peru":true,"UCL":true,"PSGCEL":true,"F1":true};

function drawChart3(filterData3){
d3.csv("../datasets/top_new_end.csv", function(error, data) {
  color3.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

  // data.forEach(function(d) {
  //   d.date = parseDate(d.date);
  // });

  var dtgFormat = d3.time.format.utc("%Y-%m-%dT%H:%M:%S");
  data.forEach(function(d){
    d.date = dtgFormat.parse(d.date.substr(0,19));
  });
     
  console.log(data);

  var cities3 = color3.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.date, tweets: +d[name]};
      })
    };
  });

  x3.domain(d3.extent(data, function(d) { return d3.time.hour(d.date); }));
  
  //x.domain(d3.extent(data, function(d) { return d.date; }));

  y3.domain([
    d3.min(cities3, function(c) { return d3.min(c.values, function(v) { return v.tweets; }); }),
    d3.max(cities3, function(c) { return d3.max(c.values, function(v) { return v.tweets; }); })
  ]);
  svg3.selectAll("*").remove();
  //LEGEND
  var legend3 = svg3.selectAll('g')
      .data(cities3)
      .enter()
    .append('g')
      .attr('class', 'legend');
    
  legend3.append('rect')
      .attr('x', width - 20)
      .attr('y', function(d, i){ return i *  20;})
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', function(d) { 
        return color3(d.name);
      });
      
      
  legend3.append('text')
      .attr('x', width - 8)
      .attr('y', function(d, i){ return (i *  20) + 9;})
      .text(function(d){ return d.name; });

  legend3
  		.on("click",function(d){
  				//filter data		
  				//filterData3[d.name]=!filterData3[d.name];
  				reDraw3(d.name);
    });
 
    	
  svg3.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis3);

  svg3.append("g")
      .attr("class", "y axis")
      .call(yAxis3)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Número de tweets");
   
  var boo3=cities3.filter(function(d){return filterData3[d.name]==true;});
  console.log("filter");
  console.log(boo3);
  
  var city3 = svg3.selectAll(".city")
      .data(cities3.filter(function(d){return filterData3[d.name]==true;})) //.filter(function(d){return filterData3[d.name]==true;})
      .enter().append("g");
    //  .attr("class", "city");
      
     console.log(city3);  
      svg3.selectAll(".city")
      .data(cities3.filter(function(d){return filterData3[d.name]==true;}))//.filter(function(d){return filterData3[d.name]==true;})
      .append("g")
      .attr("class", "city");
      
      svg3.selectAll(".city")
      .data(cities3.filter(function(d){return filterData3[d.name]==true;}))
      .exit()
      .remove();
  
  city3.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line3(d.values); })
      .style("stroke", function(d) { return color3(d.name); });

  city3.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x3(d.value.date) + "," + y3(d.value.tweets) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      // .text(function(d) { return d.name; });
    svg3.selectAll(".city")
      .data(cities3.filter(function(d){return filterData3[d.name]==true;}))
      .exit()
      .remove();
});
}
console.log(filterData3);
drawChart3(filterData3);
function reDraw3(name){
	
	filterData3[name]=!filterData3[name];
	console.log("redraw :");
	console.log(filterData3);
	drawChart3(filterData3);
}