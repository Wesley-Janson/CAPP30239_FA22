/* Wesley Janson
CAPP 30239 Final Project
Figure 2 - Variable Area Graph
*/

//d3 = require("d3@6")
//import {swatches} from "@d3/color-legend"

d3.csv("covid_prices.csv").then( data => {

    let colorMap = ({
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

    let color = d3.scaleOrdinal()
        .domain(Object.keys(colorMap))
        .range(Object.values(colorMap))

    let timeParse = d3.timeParse("%Y-%m"),
    height = 450,
    width = 700,
    margin = ({top: 10, right: 5, bottom: 10, left: 5});

    for (let d of data) {
        d.date = timeParse(d.date);
        d["Rented Housing"] = +d["Rented Housing"];
        d["Owned Housing"] = +d["Owned Housing"];
        d["Health Insurance (Net)"] = +d["Health Insurance (Net)"];
        d["Purchased Meals"] = +d["Purchased Meals"];
        d["Goodwill Medical Services"] = +d["Goodwill Medical Services"];
        d["Physician Services"] = +d["Physician Services"];
        d["Goodwill Services"] = +d["Goodwill Services"];
        d["Prescription Drugs"] = +d["Prescription Drugs"];
        d["New Light Trucks"] = +d["New Light Trucks"];
        d["Gasoline/Fuel"] = +d["Gasoline/Fuel"];
        }

    const svg = d3.select("#variable-area")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]);

    let x = d3.scaleTime()
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

    stacked = series(data);
    console.log(stacked.keys);

    let y = d3.scaleLinear()
        .domain([d3.max(stacked, d => d3.max(d, d => d[1]))*(-1), d3.max(stacked, d => d3.max(d, d => d[1]))+120])
        .range([height - margin.bottom, margin.top])

    let area = d3.area()
        .curve(d3.curveBasis)
        .x(d => x(d.data.date))
        .y0(d => y(d[0]))
        .y1(d => y(d[1]))


    svg.append("g")
        .selectAll("path")
        .data(rank(stacked))
        .join("path")
            .attr("fill", ({key}) => color(key))
            .attr("opacity", 0.8)
            .attr("d", area)
        .append("title")
            .text(({key}) => key);

    let legendGroup = svg
        .selectAll(".legend-group")
        .data(stacked)
        .join("g")
        .attr("class", "legend-group");
    
    legendGroup
        .append("circle")
        .attr("cx", (d, i) => (i < 5) ? (12.5 + (i * 135)) : (12.5 + ((i-5) * 135)))
        .attr("cy",  (d, i) => (i < 5) ? 12.3 : 32.3)
        //.attr("y",)
        .attr("r", 3)
        .attr("fill", (d, i) => color(i));
    
    legendGroup
        .append("text")
        .attr("x", (d, i) => (i < 5) ? (20 + (i * 135)) : (20 + ((i-5) * 135)))
        .attr("y", (d, i) => (i < 5) ? 15 : 35)
        .text(({key}) => key)
        .style("font-size", 9);


// Rank series each period
    function rank( series ) {
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
        return series;
    }

})