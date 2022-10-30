/*Example Scatterplot*/

let height = 400,
    width = 600,
    margin = ({ top: 25, right: 30, bottom: 35, left: 40 });
  
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]); // viewBox lets chart be dynamic

d3.csv('penguins.csv').then(data => {
  
  let x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.body_mass_g)).nice()
    .range([margin.left, width - margin.right]);

  let y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.flipper_length_mm)).nice()
    .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .attr("class", "x-axis")
    .call(d3.axisBottom(x).tickFormat(d => (d/1000) + "kg").tickSize(-height + margin.top + margin.bottom))

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .attr("class", "y-axis")
    .call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right))

  svg.append("g")
    .attr("fill", "black")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => x(d.body_mass_g))
    .attr("cy", d => y(d.flipper_length_mm))
    .attr("r", 2)
    .attr("opacity", 0.75);

  const tooltip = d3.select("body").append("div") // Selecting body (going into html and selecting body tag), append new div, class "cvg-tooltip"
    .attr("class", "svg-tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden");

  d3.selectAll("circle")  //"Adding an event", select are circles on page, when one mouseovers -> fill with red
    .on("mouseover", function(event, d) {
      d3.select(this).attr("fill", "red");
      tooltip
        .style("visibility", "visible")   // When select will become visible, and with species string
        .html(`Species: ${d.species}<br />Island: ${d.island}<br />Weight: ${d.body_mass_g/1000}kg`);
    })
    .on("mousemove", function(event) {  // Put text next to cursor
      tooltip
        .style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", function() {  // As soon as mouse moves, circles go back to black
      d3.select(this).attr("fill", "black");
      tooltip.style("visibility", "hidden");
    })
    
});