/* 
Wesley Janson
CAPP 30239 FALL 2022
Chart 3 Homework-Week 6
Chart: Stacked Bar Chart
*/


d3.csv("clean_ts_data.csv").then( data => {

  const width = 500,
  height = 300,
  margin = {top: 40, right: 30, bottom: 20, left: 30};

  const svg = d3.select("#stack-chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  let x = d3.scaleBand(data.map(d => (d.Flee)),[margin.left, width - margin.right]) //Don't have to explicitly set domain and range
    .padding([0.2]);

  let y = d3.scaleLinear([0,1400],[height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right))

  //protein,carbs,fiber
  const subgroups = data.columns.slice(1);   //Gets rid of first column "groups"

  const color = d3.scaleOrdinal(subgroups,['#e41a1c','#377eb8']);

  const stackedData = d3.stack()
    .keys(subgroups)(data);

  svg.append("g")
    .selectAll("g")
    .data(stackedData)
    .join("g")
    .attr("fill", d => color(d.key))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
    .attr("x", d => x(d.data.Flee))
    .attr("y", d => y(d[1]))
    .attr("height", d => y(d[0]) - y(d[1]))
    .attr("width",x.bandwidth());

  let legendGroup = svg
    .selectAll(".legend-group")
    .data(subgroups)
    .join("g")
    .attr("class", "legend-group");

  legendGroup
    .append("circle")
    .attr("cx", (d, i) => (10 + (i * 105)))
    .attr("cy",10)
    .attr("r", 3)
    .attr("fill", (d, i) => color(i));

  legendGroup
    .append("text")
    .attr("x", (d, i) => (15 + (i * 105)))
    .attr("y",12.5)
    .text((d, i) => subgroups[i])
    .style("font-size", 8);

});