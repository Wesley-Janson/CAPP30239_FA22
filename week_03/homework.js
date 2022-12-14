/* 
Wesley Janson
CAPP 30239 FALL 2022
Bar chart for Homework-Week 3
*/


d3.csv("library_visits_jan22.csv").then(data => {

    // Coerce 'num' column to a number
    for (let d of data) {
        d.num = +d.num;
    };

    const height = 600,
          width = 800,
          margin = ({top: 25, right: 30, bottom: 35, left: 50});

    let svg = d3.select("#chart")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]);

    let x = d3.scaleBand()  // Scales take two values: domain (e.g. values 0,100 if continuous)
        .domain(data.map(d => d.branch))         //  and range (e.g. space that it take up)
        .range([margin.left, width - margin.right])
        .padding(0.1);

    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.num)]).nice()      // Goes through all library visits and finds the highest value
        .range([height -margin.bottom, margin.top]);

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x));

    const yAxis = g => g
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y));

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`) // move location of axis
        .call(d3.axisBottom(x));
    
    svg.append("g")
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y));

    let bar = svg.selectAll(".bar")
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");

    /* Append bar graph-as "rect" shape
       Specify bar wisth and height (based off 'num' column values) */
    bar.append("rect")
        .attr("fill", "steelblue")
        .attr("x", d => x(d.branch))  // x position attribute
        .attr("width", x.bandwidth())  // this width is the width attr on the element
        .attr("y", d => y(d.num))  // y position attribute
        .attr("height", d => y(0) - y(d.num));  // this height is the height attr on element
    
    bar.append('text') // add labels
        .text(d => d.num)
        .attr('x', d => x(d.branch) + (x.bandwidth()/2))
        .attr('y', d => y(d.num) + 15)
        .attr('text-anchor', 'middle')
        .style('fill', 'white');

});



