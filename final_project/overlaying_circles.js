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

    // Feb 2020 Line
    // const type = d3.annotationLabel

    // const annotations = [{
    // note: {
    //     label: "Longer text to show text wrapping",
    //     bgPadding: 20,
    //     title: "Annotations :)"
    // },
    // //can use x, y directly instead of data
    // data: { date: "18-Sep-09", close: 185.02 },
    // className: "show-bg",
    // dy: 137,
    // dx: 162
    // }]

    

    circle_svg
        .append("line")
        .style("stroke", "black")
        .style("stroke-width", 0.1)
        .attr("x1", (width/2)-base_circle)
        .attr("y1", (height/2))
        .attr("x2", (width/2)-base_circle*2.5)
        .attr("y2", (height/2));

    // Feb 2020 Text
    circle_svg
        .append("text")
        .attr("x", ((width/2)-base_circle)-6.25)
        .attr("y", (height/2)+0.25)
        .text("Feb 2020")
        .style("font-size", 0.65);

    // Current Level Line
    circle_svg
        .append("line")
        .style("stroke", "black")
        .style("stroke-width", 0.1)
        .attr("x1", (width/2))
        .attr("y1", d => {
            return (height/2)-(base_circle*(1 + Current))*-1
        })
        .attr("x2", (width/2))
        .attr("y2", d => {
            return ((height/2)-(base_circle*(1 + Current))*-1)+2.25
        });

    // Current Level Text
    circle_svg
        .append("text")
        .attr("x", (height/2)-1.45)
        .attr("y", ((height/2)-(base_circle*(1 + Current))*-1)+2.85)
        .text("Current")
        .style("font-size", 0.65);

    // "Max" Level Line 
    circle_svg
        .append("line")
        .style("stroke", "black")
        .style("stroke-width", 0.1)
        .attr("x1", d => {
            return (width/2)+(1.41421356237/2)*(base_circle*(1 + Max))
        })
        .attr("y1", (height/2)-(-1.41421356237/2)*(base_circle*(1 + Max)))
        .attr("x2", d => {
            return (width/2)+(1.41421356237/2)*(base_circle*(1 + Max))+1.75
        })
        .attr("y2", (height/2)-(-1.41421356237/2)*(base_circle*(1 + Max))+1.75);

    // "Max" Level Text
    circle_svg
        .append("text")
        .attr("x", d => {
            return (width/2)+(1.41421356237/2)*(base_circle*(1 + Max))+1.85
        })
        .attr("y", (height/2)-(-1.41421356237/2)*(base_circle*(1 + Max))+2)
        .text("Max Deviation")
        .style("font-size", 0.65);

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
        .attr("x", width/2)
        .attr("y", 5.25)
        .attr("text-anchor", "middle")
        .text(Component)
        .style("font-size", 1);

}
