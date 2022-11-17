/* Wesley Janson
CAPP 30239 Final Project
Figure 2 - Variable Area Graph
*/

//d3 = require("d3@6")
//import {swatches} from "@d3/color-legend"

d3.csv("covid_prices.csv").then( data => {

    let timeParse = d3.timeParse("%Y-%m");
    height = 500
    margin = ({top: 10, right: 20, bottom: 30, left: 20})

    for (let d of data) {
        d.date = timeParse(d.date);
        d["Rented Housing"] = +d["Rented Housing"]
        d["Owned Housing"] = +d["Owned Housing"]
        d["Health Insurance (Net)"] = +d["Health Insurance (Net)"]
        d["Purchased Meals"] = +d["Purchased Meals"]
        d["Goodwill Medical Services"] = +d["Goodwill Medical Services"]
        d["Physician Services"] = +d["Physician Services"]
        d["Goodwill Services"] = +d["Goodwill Services"]
        d["Prescription Drugs"] = +d["Prescription Drugs"]
        d["New Light Trucks"] = +d["New Light Trucks"]
        d["Gasoline/Fuel"] = +d["Gasoline/Fuel"]
        }

    const svg = d3.select("#variable-area")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]);

    svg.append("g")
        .selectAll("line")
        .data(dates(data))
        .join("line")
            .attr("x1", d => x(d.date))
            .attr("y1", 0)
            .attr("x2", d => x(d.date))
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
        .data(dates(data))
        .join("text")
            .attr("text-anchor", "middle")
            .attr("x", d => x(d.date))
            .attr("y", d => y(d.maxY))
            .attr("y", 30)
            .text(d => d.date);

    svg.append("g")
        .call(xAxis);

    return svg.node();
})


/* Create functions to be called above */

// Function to create dates?
function dates({ data }) {
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
            date: data[i].date,
            minY,
            maxY
        });
    }
    return arr;
}

// What does this do?
function fct({ data }) {
    for (let i = 0; i < series[0].length; i++) {
        
        let start = Infinity;
        let arr = [];

        for (let j = 0; j < series.length; j++) {
            let d = series[j];

            arr.push({
            j,amount: d[i][1] - d[i][0]
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
    .keys(["Rented Housing", "Owned Housing", "Health Insurance (Net)", "Purchased Meals", 
    "Goodwill Medical Services", "Physician Services", "New Light Trucks", "Goodwill Services",
    "Prescription Drugs", "Gasoline/Fuel"])
    .offset(d3.stackOffsetWiggle)
    .order(d3.stackOrderInsideOut)
  (data)

area = d3.area()
    .curve(d3.curveBasis)
    // .curve(d3.curveLinear)
    .x(d => x(d.data.date))
    .y0(d => y(d[0]))
    .y1(d => y(d[1]))

x = d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([margin.left, width - margin.right]);

y = d3.scaleLinear()
    .domain([d3.min(series, d => d3.min(d, d => d[0])), d3.max(series, d => d3.max(d, d => d[1]))])
    .range([height - margin.bottom, margin.top])

colorMap = ({
        "Rented Housing": "#abdda4",
        "Owned Housing": "#fee08b",
        "Health Insurance (Net)": "#fdae61",
        "Purchased Meals": "#3288bd",
        "Goodwill Medical Services": "#DB95D2",
        "Physician Services": "#66AADD",
        "New Light Trucks": "#66c2a5",
        "Goodwill Services": "#d53e4f",
        "Prescription Drugs": "#d53e3d",
        "Gasoline/Fuel":"#DB97H1"
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



