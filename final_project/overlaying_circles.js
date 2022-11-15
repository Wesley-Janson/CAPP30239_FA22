/* Wesley Janson
CAPP 30239 Final Project
Figure 2 - Overlaying Circles Graph
*/

d3.csv("overlap_circles.csv").then(data => {
    for (let d of data) {
        createCircle(d);   // Loop through CSV, run function to create circles for each data point (Component)
    }
});

function createCircle({ Base, Max, Current, Component }) {
    Base = +Base;
    Max = +Max;
    Current = +Current;

    let width = 20,
        height = 20,
        base_circle = 2;

    let circle_svg = d3.select("#overlap")
        .append("svg")
        .attr("viewBox", [0,0,width,height]);

    circle_svg
        .append("circle")
        .attr("cx", width/2)
        .attr("cy", height/2)
        .attr("r", d => {
            return base_circle*(1 + Max)
        })
        .style("fill", "blue")
        .attr("opacity", 0.15);

    circle_svg
        .append("circle")
        .attr("cx", width/2)
        .attr("cy", height/2)
        .attr("r", d => {
            return base_circle*(1 + Current)
        })
        .style("fill", "blue")
        .attr("opacity", 0.15)

    circle_svg
        .append("circle")
        .attr("cx", width/2)
        .attr("cy", height/2)
        .attr("r", d => {
            return base_circle
        })
        .style("fill", "blue")
        .attr("opacity", 0.15)

    circle_svg
        .append("text")
        .attr("font-size", 1)
        .attr("x", 2)
        .attr("y", 5)
        .attr("alignment-baseline", "middle")
        .text(Component)
        .style("font-size", 1);

}
