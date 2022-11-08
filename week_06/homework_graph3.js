

d3.csv("clean_ts_data.csv").then( data => {
  let timeParse = d3.timeParse("%Y-%m-%d");

  let flee_status = new Set(); 

  for (let d of data) {
    d.Date = timeParse(d.Date);
    d.value = +d.value;
    flee_status.add(d.Flee); // push unique values to Set
  }

  const width = 450,
  height = 250,
  margin = {top: 40, right: 30, bottom: 20, left: 20};

  const svg = d3.select("#stack-chart")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

  //let x = d3.scaleBand(data.map(d => (d.group)),[margin.left, width - margin.right]) //Don't have to explicitly set domain and range
  //.padding([0.2]);

  let x = d3.scaleTime()
    .domain(d3.extent(data, d => d.Date))
    .range([margin.left, width - margin.right]);

  let y = d3.scaleLinear([0,45],[height - margin.bottom, margin.top]);

  svg.append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(x))

  svg.append("g")
  .attr("transform", `translate(${margin.left},0)`)
  .call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right))

  //protein,carbs,fiber
  const subgroups = flee_status;   //Gets rid of second column "flee"
  console.log(subgroups)
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
  .attr("width",x.bandwidth())

  let legendGroup = svg
    .selectAll(".legend-group")
    .data(subgroups)
    .join("g")
    .attr("class", "legend-group");

  legendGroup
    .append("circle")
    .attr("cx", (d, i) => (10 + (i * 75)))
    .attr("cy",10)
    .attr("r", 3)
    .attr("fill", (d, i) => color(i));

  legendGroup
    .append("text")
    .attr("x", (d, i) => (20 + (i * 75)))
    .attr("y",15)
    .text((d, i) => subgroups[i]);

});