/* Wesley Janson
CAPP 30239 Final Project
Figure 2 - Variable Area Graph
*/

//d3 = require("d3@6")
//import {swatches} from "@d3/color-legend"

d3.csv("covid_prices.csv").then( data => {

    let timeParse = d3.timeParse("%Y-%m"),
    height = 400,
    width = 650,
    margin = ({top: 10, right: 20, bottom: 30, left: 20});

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

    x = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([margin.left, width - margin.right]);

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.top})`)
        .call(d3.axisBottom(x)
        .tickSizeOuter(0)
        .tickSizeInner(0))

    var series = d3.stack()
        .keys(["Rented Housing", "Owned Housing", "Health Insurance (Net)", "Purchased Meals", 
        "Goodwill Medical Services", "Physician Services", "New Light Trucks", "Goodwill Services",
        "Prescription Drugs", "Gasoline/Fuel"])
        .offset(d3.stackOffsetWiggle)
        .order(d3.stackOrderInsideOut)

    var stacked = series(data);

    y = d3.scaleLinear()
        .domain([d3.min(stacked, d => d3.max(d, d => d[1])), d3.max(stacked, d => d3.max(d, d => d[1]))])
        .range([height - margin.bottom, margin.top])

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).tickSize(-innerWidth).tickFormat(d => d));

    area = d3.area()
        .curve(d3.curveBasis)
        // .curve(d3.curveLinear)
        .x(d => x(d.data.date))
        .y0(d => y(d[0]))
        .y1(d => y(d[1]))


    svg.append("g")
        .selectAll("path")
        .data(series(data))
        .join("path")
            .attr("fill", ({key}) => color(key))
            .attr("opacity", 0.9)
            .attr("d", area)
        .append("title")
            .text(({key}) => key);

    // svg.append("g")
    //     .selectAll("text")
    //     .data(dates(data))
    //     .join("text")
    //         .attr("text-anchor", "middle")
    //         .attr("x", d => x(d.date))
    //         .attr("y", d => y(d.maxY))
    //         .attr("y", 30)
    //         .text(d => d.date);


    // return svg.node();
})


/* Create functions to be called above */

// Function to create dates?
// function dates({ data }) {
//     let arr = [];
//     for(let i = 0; i < series(data)[0].length; i++) {
//         let minY = Infinity;
//         let maxY = -Infinity;

//         for(let s of series(data)) {
//             if(s[i][0] < minY) {
//                 minY = s[i][0];
//             }
//             if(s[i][1] > maxY) {
//                 maxY = s[i][1];
//             }
//         }

//         arr.push({
//             date: data[i].date,
//             minY,
//             maxY
//         });
//     }
//     return arr;
// }

// // What does this do?
// function fct({ data }) {
//     for (let i = 0; i < series[0].length; i++) {
        
//         let start = Infinity;
//         let arr = [];

//         for (let j = 0; j < series.length; j++) {
//             let d = series[j];

//             arr.push({
//             j,amount: d[i][1] - d[i][0]
//             });

//             if (d[i][0] < start) {
//             start = d[i][0];
//             }
//         }

//         arr.sort((a, b) => a.amount - b.amount);

//         for (let obj of arr) {
//             series[obj.j][i][0] = start;
//             series[obj.j][i][1] = start + obj.amount;

//             start += obj.amount;
//         }
//     }
// }

colorMap = ({
        "Rented Housing": "#1f77b4",
        "Owned Housing": "#ff7f0e",
        "Health Insurance (Net)": "#2ca02c",
        "Purchased Meals": "#d62728",
        "Goodwill Medical Services": "#9467bd",
        "Physician Services": "#8c564b",
        "New Light Trucks": "#e377c2",
        "Goodwill Services": "#7f7f7f",
        "Prescription Drugs": "#bcbd22",
        "Gasoline/Fuel":"#17becf"
})

color = d3.scaleOrdinal()
    .domain(Object.keys(colorMap))
    .range(Object.values(colorMap))
