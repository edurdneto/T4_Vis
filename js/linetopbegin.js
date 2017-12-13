var margin = {top: 200, right: 80, bottom: 30, left: 300},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// var parseDate = d3.time.format("%Y%m%d").parse;

var x2 = d3.time.scale()
    .range([0, width]);

var y2 = d3.scale.linear()
    .range([height, 0]);

var color2 = d3.scale.category10();

var xAxis2 = d3.svg.axis()
    .scale(x2)
    .orient("bottom");

var yAxis2 = d3.svg.axis()
    .scale(y2)
    .orient("left");

var line2 = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x2(d.date); })
    .y(function(d) { return y2(d.tweets); });

var svg2 = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  
      
// var filterData={"RealMadrid":true,"NFL":true,"Palmeiras":true};//cities to be shown
var filterData={"NFL":true,"Barcelona":true,"PSG":true,"NBA":true,"RealMadrid":true,"ChampionsLeague":true,"Peru":true,"UCL":true,"PSGCEL":true,"F1":true};

function drawChart2(filterData){
d3.csv("../datasets/top_new_begin.csv", function(error, data) {
  color2.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

  // data.forEach(function(d) {
  //   d.date = parseDate(d.date);
  // });

  var dtgFormat = d3.time.format.utc("%Y-%m-%dT%H:%M:%S");
  data.forEach(function(d){
    d.date = dtgFormat.parse(d.date.substr(0,19));
  });
     
  console.log(data);

  var cities = color2.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.date, tweets: +d[name]};
      })
    };
  });

  x2.domain(d3.extent(data, function(d) { return d3.time.hour(d.date); }));
  
  //x.domain(d3.extent(data, function(d) { return d.date; }));

  y2.domain([
    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.tweets; }); }),
    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.tweets; }); })
  ]);
  svg2.selectAll("*").remove();
  //LEGEND
  var legend2 = svg2.selectAll('g')
      .data(cities)
      .enter()
    .append('g')
      .attr('class', 'legend');
    
  legend2.append('rect')
      .attr('x', width - 20)
      .attr('y', function(d, i){ return i *  20;})
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', function(d) { 
        return color2(d.name);
      });
      
      
  legend2.append('text')
      .attr('x', width - 8)
      .attr('y', function(d, i){ return (i *  20) + 9;})
      .text(function(d){ return d.name; });

  legend2
  		.on("click",function(d){
  				//filter data		
  				//filterData[d.name]=!filterData[d.name];
  				reDraw2(d.name);
    });
 
    	
  svg2.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis2);

  svg2.append("g")
      .attr("class", "y axis")
      .call(yAxis2)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Número de tweets");
   
  var boo2=cities.filter(function(d){return filterData[d.name]==true;});
  console.log("filter");
  console.log(boo2);
  
  var city2 = svg2.selectAll(".city")
      .data(cities.filter(function(d){return filterData[d.name]==true;})) //.filter(function(d){return filterData[d.name]==true;})
      .enter().append("g");
    //  .attr("class", "city");
      
     console.log(city2);  
      svg2.selectAll(".city")
      .data(cities.filter(function(d){return filterData[d.name]==true;}))//.filter(function(d){return filterData[d.name]==true;})
      .append("g")
      .attr("class", "city");
      
      svg2.selectAll(".city")
      .data(cities.filter(function(d){return filterData[d.name]==true;}))
      .exit()
      .remove();
  
  city2.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line2(d.values); })
      .style("stroke", function(d) { return color2(d.name); });

  city2.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x2(d.value.date) + "," + y2(d.value.tweets) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      // .text(function(d) { return d.name; });
    svg2.selectAll(".city")
      .data(cities.filter(function(d){return filterData[d.name]==true;}))
      .exit()
      .remove();
});
}
console.log(filterData);
drawChart2(filterData);
function reDraw2(name){
	
	filterData[name]=!filterData[name];
	console.log("redraw :");
	console.log(filterData);
	drawChart(filterData);
}