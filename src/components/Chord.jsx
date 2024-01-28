import { observer } from "mobx-react-lite";
import * as d3 from "d3";
import { getWordsArray, countUniqueCoincidences, getConcatenatedAbout } from "../utilities";



function Chord(props) {

    // create input data: a square matrix that provides flow between entities
    let matrix = Array.from({ length: 41 }, () => Array(41).fill(null));
    //console.log(props.students);
    let alias = props.students.map((student) => { return student.alias });
    //console.log(names);

    for (let row = 0; row < props.students.length; row++) {
        for (let col = 0; col < props.students.length; col++) {

            if (col === row) {
                matrix[row][col] = 0;
            } else {
                let studentAWordList = getWordsArray(getConcatenatedAbout(props.students[row].about));
                let studentBWordList = getWordsArray(getConcatenatedAbout(props.students[col].about));

                const coincidencies = countUniqueCoincidences(studentAWordList, studentBWordList);

                if (coincidencies > 5) {
                    matrix[row][col] = coincidencies;
                } else { matrix[row][col] = 0; }
            }

        }
    }

    //console.table(matrix);

    const innerRadius = 230
    const outerRadius = 240
    const colorScale = d3
        .scaleOrdinal()
        .domain(alias)
        .range(
            d3
                .range(alias.length)
                .map((n) => d3.interpolateRainbow(n / alias.length))
        )

    const shapedData = Object.assign(
        matrix.map((r) => Object.entries(r).map((v) => +v[1])),
        {
            names: alias,
            colors: colorScale.domain()
        }
    )
    const chord = d3
        .chord()
        .padAngle(5 / innerRadius)
        .sortSubgroups(d3.descending);

    const chords = chord(shapedData);
    const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    const ribbon = d3
        .ribbon()
        .radius(innerRadius - 1)
        .padAngle(1 / innerRadius);

    // create the svg area
    //document.querySelector("#my_dataviz").innerHTML = "";
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", 440)
        .attr("height", 440)
        .append("g")
        .attr("transform", "translate(220,220)")

    // give this matrix to d3.chord(): it will calculates all the info we need to draw arc and ribbon
    var res = d3.chord(shapedData)
        .padAngle(0.05)     // padding between entities (black arc)
        .sortSubgroups(d3.descending)
        (matrix)

    // add the groups on the inner part of the circle
    svg
        .datum(res)
        .append("g")
        .selectAll("g")
        .data(function (d) { return d.groups; })
        .enter()
        .append("g")
        .append("path")
        .style("fill", "grey")
        .style("stroke", "black")
        .attr("d", d3.arc()
            .innerRadius(200)
            .outerRadius(210)
        )

    // Add the links between groups
    svg
        .datum(res)
        .append("g")
        .selectAll("path")
        .data(function (d) { return d; })
        .enter()
        .append("path")
        .attr("d", d3.ribbon()
            .radius(200)
        )
        .style("fill", "#69b3a2")
        .style("stroke", "black");

/*
    var tooltip = d3.select("#my_dataviz")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")

    var showTooltip = function (d) {
        tooltip
            .style("opacity", 1)
            .html("Source: " + names[d.source.index] + "<br>Target: " + names[d.target.index])
            .style("left", (d3.event.pageX + 15) + "px")
            .style("top", (d3.event.pageY - 28) + "px")
    }

    // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    var hideTooltip = function (d) {
        tooltip
            .transition()
            .duration(1000)
            .style("opacity", 0)
    }
    svg
        .datum(res)
        .append("g")
        .selectAll("path")
        .data(function (d) { return d; })
        .enter()
        .append("path")
        .attr("d", d3.ribbon()
            .radius(220)
        )
        .style("fill", "#69b3a2")
        .style("stroke", "none")
        .on("mouseover", showTooltip)
        .on("mouseleave", hideTooltip)*/

    return (<div id="my_dataviz"></div>)

}

export default observer(Chord);