/* 
Wesley Janson
CAPP 30239 FALL 2022
Chart 2 Homework-Week 6
Chart: Donut Chart of Race Breakdown
*/


d3.json('a3cleanedonly2015.json').then((data) => {
    const height = 550,
      width = 650,
      innerRadius = 125,
      outerRadius = 175,
      labelRadius = 200;
    
    let pieData = [
    { race: "", count: 0 },
    { race: "Asian", count: 0 },
    { race: "Black", count: 0 },
    { race: "Hispanic", count: 0 },
    { race: "Native", count: 0 },
    { race: "Other", count: 0 },
    { race: "White", count: 0 },
    ];

    for(var d of data) {
        let pd = pieData.find(pd => pd.race == d["Race"]);
        pd.count += 1;
    }


    const arcs = d3.pie().value(d => d.count)(pieData);
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);


    const svg = d3.select("#donut-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  
    svg.append("g")
      .attr("stroke", "white")
      .attr("stroke-width", 2) // Lines 20-22 Make white separators between groups
      .attr("stroke-linejoin", "round")
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("fill", (d, i) => d3.schemeCategory10[i])
      .attr("d", arc);
  
    svg.append("g")
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .join("text")
      .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
      .selectAll("tspan")
      .data(d => {
        return [d.data.race, d.data.count];
      })
      .join("tspan")
      .attr("x", 0)
      .attr("y", (d, i) => `${i * 1.1}em`)
      .attr("font-weight", (d, i) => i ? null : "bold")
      .text(d => d);
  
    svg.append("text")
      .attr("font-size", 30)
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text("Race of Victims")
      .style("font-size", 20);
  });