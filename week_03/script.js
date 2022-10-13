/*Bar chart for covid country cases*/

d3.csv("covid.csv").then(data => {

    for (let d of data) {
        d.cases = +d.cases;  // Coerces 'cases' to a number
    };

    const height = 600,
          width = 800,
          margin = ({top: 25, right: 30, bottom: 35, left: 50});

    let svg = d3.select("#chart")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]);

    let x = d3.scaleBand()  // Scales take two values: domain (e.g. values 0,100 if continuous)
        .domain(data.map(d => d.country))         //  and range (e.g. space that it take up)
        .range([margin.left, width - margin.right])
        .padding(0.1);

    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.cases)]).nice()      // Goes through all cases and finds the highest value
        .range([height -margin.bottom, margin.top]);  //svgs are built from the top down

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x));

    const yAxis = g => g
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y));

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    let bar = svg.selectAll(".bar")
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");

    bar.append("rect")
        .attr("fill", "steelblue")
        .attr("x", d => x(d.country))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.cases))
        .attr("height", d => y(0) - y(d.cases));

});