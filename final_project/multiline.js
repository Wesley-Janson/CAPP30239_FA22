/* Wesley Janson
CAPP 30239 Final Project
Figure 1 - Multiline Graph
*/

let height = 215,
    width = 350,
    margin = ({ top: 25, right: 30, bottom: 35, left: 30 })
    innerWidth = width - margin.left - margin.right;

const svg = d3.select("#multiline")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

d3.csv("pctile_prices.csv").then(data => {
  let timeParse = d3.timeParse("%Y-%m");

  let pctiles = new Set();

  for (let d of data) {
    d.Date = timeParse(d.Date);
    d.Value = +d.Value;
    pctiles.add(d.measure);
  }


  let x = d3.scaleTime()
    .domain(d3.extent(data, d => d.Date))
    .range([margin.left, width - margin.right]);

  let y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.Value))
    .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSize(-innerWidth).tickFormat(d => d + "%"));

  let line = d3.line()
    .x(d => x(d.Date))
    .y(d => y(d.Value));
 
  for (let pctile of pctiles) {
    let pctileData = data.filter(d => d.measure === pctile);

    let g = svg.append("g")
      .attr("class", "pctile")
      .on('mouseover', function () {
        d3.selectAll(".highlight").classed("highlight", false);
        d3.select(this).classed("highlight", true);
      });

    if (pctile === "Median") {
      g.classed("highlight", true);
    }

    g.append("path")
      .datum(pctileData)
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("d", line)

    let lastEntry = pctileData[pctileData.length - 1]; //last piece of data to position text x and y

    g.append("text")
      .text(pctile)
      .attr("x", x(lastEntry.Date) + 3)
      .attr("y", y(lastEntry.Value))
      .attr("dominant-baseline", "middle")
      .attr("fill", "#999");
  }
  
});