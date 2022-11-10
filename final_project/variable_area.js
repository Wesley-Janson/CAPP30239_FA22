/* Wesley Janson
CAPP 30239 Final Project
Figure 1 - Variable Area Graph
*/

d3 = require("d3@6")
import {swatches} from "@d3/color-legend"

data = d3.csv(clean_ts_data.csv).then( data => {
    height = 500
    margin = ({top: 0, right: 20, bottom: 30, left: 20})

    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height]);

    svg.append("g")
        .selectAll("line"),
        .data(chapters
        .join("line")
            .attr("x1", d => x(d.chapter))
            .attr("y1", 0)
            .attr("x2", d => x(d.chapter))
            .attr("y2", height - margin.top - margin.bottom)
            .style("stroke-width", 1)
            .style("stroke", "#333")
            .style("fill", "none");

    svg.append("g")
        .selectAll("path")
        .data(series)
        .join("path")
            .attr("fill", ({key}) => color(key))
            .attr("opacity", 0.9)
            .attr("d", area)
        .append("title")
            .text(({key}) => key);

    svg.append("g")
        .selectAll("text")
        .data(chapters)
        .join("text")
            .attr("text-anchor", "middle")
            .attr("x", d => x(d.chapter))
            .attr("y", d => y(d.maxY))
            .attr("y", 30)
            .text(d => d.chapter);

    svg.append("g")
        .call(xAxis);

    return svg.node();
}


chapters = {
    let arr = [];

    for(let i = 0; i < series[0].length; i++) {
        let minY = Infinity;
        let maxY = -Infinity;
    
        for(let s of series) {
            if(s[i][0] < minY) {
                minY = s[i][0];
            }
            if(s[i][1] > maxY) {
                maxY = s[i][1];
            }
        }
    
        arr.push({
            chapter: data[i].chapter,
            minY,
            maxY
        });
    }

    return arr; 
}

{
    for (let i = 0; i < series[0].length; i++) {
      
    let start = Infinity;
    let arr = [];

    for (let j = 0; j < series.length; j++) {
      let d = series[j];

      arr.push({
        j,
        amount: d[i][1] - d[i][0]
      });

      if (d[i][0] < start) {
        start = d[i][0];
      }
    }

    arr.sort((a, b) => a.amount - b.amount);

    for (let obj of arr) {
      series[obj.j][i][0] = start;
      series[obj.j][i][1] = start + obj.amount;

      start += obj.amount;
    }
  }
}

series = d3.stack()
    .keys(["sadness","joy","surprise","disgust", "trust", "fear", "anger", "anticipation"])
    .offset(d3.stackOffsetWiggle)
    .order(d3.stackOrderInsideOut)
  (data)

area = d3.area()
    .curve(d3.curveBasis)
    // .curve(d3.curveLinear)
    .x(d => x(d.data.chapter))
    .y0(d => y(d[0]))
    .y1(d => y(d[1]))

x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.date))
    .range([margin.left, width - margin.right])

y = d3.scaleLinear()
    .domain([d3.min(series, d => d3.min(d, d => d[0])), d3.max(series, d => d3.max(d, d => d[1]))])
    .range([height - margin.bottom, margin.top])

colorMap = ({
        "trust": "#abdda4",
        "joy": "#fee08b",
        "anticipation": "#fdae61",
        "sadness": "#3288bd",
        "disgust": "#DB95D2",
        "surprise": "#66AADD",
        "fear": "#66c2a5",
        "anger": "#d53e4f"
})

color = d3.scaleOrdinal()
    .domain(Object.keys(colorMap))
  // .range(d3.schemeCategory10)
  // .range(["orange","orange","orange"])
  // .range(["red","orange","yellow","green","blue","purple"])
  // .range(d3.schemeSpectral[8])
    .range(Object.values(colorMap))


xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .call(g => g.select(".domain").remove())



