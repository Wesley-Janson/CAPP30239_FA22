/* Homework 2-D3 Line Chart Exercise*/

// Variables are on top because they are not dependant on data
const height = 500,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 });
    
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

// Load in data, create timeParse function
d3.csv('long-term-interest-canada.csv').then(data => {
    let timeParse = d3.timeParse("%Y-%m");

    // Coerce "Num" to a numeric, "Month" to date
    for (let d of data) {
        d.Num = +d.Num;
        d.Month = timeParse(d.Month);
    }

    // Create x-axis 
    let x = d3.scaleTime()
        .domain(d3.extent(data, d => d.Month))
        .range([margin.left, width - margin.right]);

    // Create y-axis
    let y = d3.scaleLinear()
        .domain([0,d3.max(data, d => d.Num)])
        .range([height - margin.bottom, margin.top]);

    // Create y-axis tick marks, specialize them
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .attr("class", "y-axis")
      .call(d3.axisLeft(y).tickSizeOuter(0).tickFormat(d => d + "%").tickSize(-width));
    
    // Create x-axis tick marks 
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    // Create x-axis label
    svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height)
      .attr("dx", "0.5em")
      .attr("dy", "-0.5em") 
      .text("Month");
    
    // Create y-axis label
    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 10)
      .attr("transform", "rotate(-90)")
      .text("Interest Rate");

    // Create line to be placed in chart
    let line = d3.line()
        .x(d => x(d.Month))
        .y(d => y(d.Num));

    // Add line to graph
    svg.append("path")
        .datum(data)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "steelblue");

  });