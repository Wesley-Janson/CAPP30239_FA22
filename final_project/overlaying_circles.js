/* Wesley Janson
CAPP 30239 Final Project
Figure 2 - Overlaying Circles Graph
*/

let base_circle = 10;

const circle_svg = d3.select("#overlap")
    .append("svg")
    .attr("viewBox", [0, 0, 100, 100]);

d3.csv("overlap_test.csv").then(data => {


    for (let d of data) {
        d.Base = +d.Base;
        d.Max = +d.Max;
        d.Current = +d.Current;
    }
    console.log(data)
    console.log(data['Base'])

    // Create Base Circle
    circle_svg
        .append('circle')
        .attr('cx', '50%')
        .attr('cy', '50%')
        .attr('r', base_circle)
        .style('fill', 'blue')
        .style("opacity", 0.75);

    // Create Current Reading Circle
    circle_svg
        .append('circle')
        .attr('cx', '50%')
        .attr('cy', '50%')
        //.attr('r', base_circle*(1+(data.Current)))
        .attr('r', base_circle*(1+(0.41)))
        .style('fill', 'blue')
        .style("opacity", 0.5);

    // Create Max Reading Circle
    circle_svg
        .append('circle')
        .attr('cx', '50%')
        .attr('cy', '50%')
        .attr('r', base_circle*(1+(0.79)))
        .style('fill', 'blue')
        .style("opacity", 0.25);
})


