/* 
Wesley Janson
CAPP 30239 FALL 2022
Chart 1 Homework-Week 6
Chart: Histogram of Age Breakdown
*/

const height = 400,
    width = 600,
    margin = ({ top: 25, right: 10, bottom: 50, left: 10 }),
    padding = 1;

const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.json('a3cleanedonly2015.json').then((data) => {

  const x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.Age)).nice()
    .range([margin.left, width - margin.right]);
  
  const y = d3.scaleLinear()
    .range([height - margin.bottom, margin.top])
    .domain([0,500]);
    
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom + 5})`)
    .call(d3.axisBottom(x));

  const binGroups = svg.append("g")
    .attr("class", "bin-group");

  const bins = d3.bin()
    .thresholds(10)
    .value(d => d.Age)(data);
  
  console.log(bins);

  let g = binGroups.selectAll("g")
    .data(bins)
    .join("g");

  g.append("rect")
    .attr("x", d => x(d.x0) + (padding / 2))
    .attr("width", d => x(d.x1) - x(d.x0) - padding)
    .attr("y", height - margin.bottom)
    .attr("height", 0)
    .attr("fill", "steelblue")
    .transition()
    .duration(750)
    .attr("y", d => y(d.length))
    .attr("height", d => height - margin.bottom - y(d.length));

  g.append("text")
    .text(d => d.length)
    .attr("x", d => x(d.x0) + (x(d.x1) - x(d.x0)) / 2)
    .attr("y", d => y(d.length) - 5)
    .attr("text-anchor", "middle")
    .attr("fill", "#333");

    // Create x-axis label
    svg.append("text")
    .attr("class", "x-label")
    .attr("text-anchor", "end")
    .attr("x", (width/2)+45)
    .attr("y", height)
    .attr("dx", "0.5em")
    .attr("dy", "-0.5em") 
    .text("Age of Victims");

});