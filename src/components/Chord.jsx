import { observer } from "mobx-react-lite";
import * as d3 from "d3";
import { useEffect, useState, useRef } from "react";
import "./ChordControllers.css"

function Chord(props) {
    function isBorn() {
        console.log("Chord Born")
        //document.querySelector("#chord_dataviz").innerHTML = null;
        return function isDyingACB() { console.log('Die') }
    }
    useEffect(isBorn, []);
    const [data, setData] = useState(props.data);

    const svgRef = useRef();
    const divRef = useRef();

    // create input data: a square matrix that provides flow between entities
    //const [matrix, setMatrix] = useState(props.data);
    //Array.from({ length: 41 }, () => Array(41).fill(null));
    //populateChordMatrix(matrix, props.students);
    //props.students.map((student) => { return student.alias });
    //const formatValue = d3.format(".1~%");

    useEffect(() => {
        svgRef.current.innerHTML = "";
        const aliases = props.labels
        const dimensions = Object({ height: 720, width: 720 });
        const outerRadius = dimensions.height * 0.5 - 60;
        const innerRadius = outerRadius - 10;
        const formatValue = d3.format(".1~%");
        const colorScale = d3
            .scaleOrdinal()
            .domain(aliases)
            .range(
                d3
                    .range(aliases.length)
                    .map((n) => d3.interpolateRainbow(n / aliases.length))
            )

        const handleArcOver = (d, i) => {
            alert(d);
        }

        const shapedData = Object.assign(
            data.map((r) => Object.entries(r).map((v) => +v[1])),
            {
                names: aliases,
                colors: colorScale.domain()
            }
        );

        const svg = d3
            .select(svgRef.current)
            .attr("height", dimensions.height)
            .attr("width", dimensions.width)
            .attr(
                "transform",
                `translate(${dimensions.height / 2},${dimensions.width / 2})`
            )
            .attr("overflow", "visible");


        const chord = d3
            .chord()
            .padAngle(5 / innerRadius)
            .sortSubgroups(d3.descending);

        const arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

        const ribbon = d3
            .ribbon()
            .radius(innerRadius - 1)
            .padAngle(1 / innerRadius);

        const chords = chord(shapedData);

        //TOOLTIP

        function getSomething(e) {
            const sourceIndex = e.target["__data__"].source.index;
            const coincidencies = e.target["__data__"].source.value
            const targetIndex = e.target["__data__"].target.index;
            const sourceStudent = props.labels[sourceIndex];//.alias;
            const targetStudent = props.labels[targetIndex];//.alias;
            return `${sourceStudent} and ${targetStudent} </br> You have ${coincidencies} commun topics`
            //console.log(`${sourceStudent} and ${targetStudent} have ${coincidencies} commoun topics`);
        }

        let inside = false;
        //select("#my_dataviz")
        let Tooltip = d3.select("#my_dataviz").append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "black")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")
            .style("width", "240px")

        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function (d) {
            inside = true;
            Tooltip
                .style("opacity", 1)
            d3.select(this)
                .style("stroke", "black")
                .style("opacity", 1)
        }
        var mousemove = function (d) {
            document.addEventListener("mousemove", logKey);

            function logKey(e) {
                if (inside)
                    Tooltip
                        .html(getSomething(e))
                        .style("position", "absolute")
                        .style("left", 20 + e.clientX + "px")
                        .style("top", 20 + e.clientY + "px")
            }

        }
        var mouseleave = function (d) {
            inside = false;
            Tooltip
                .style("opacity", 0)
            d3.select(this)
                .style("stroke", "none")
                .style("opacity", 0.8)
        }/**/
        //-----------------------



        let group = svg
            .append("g")
            .attr("font-size", 10)
            .attr("font-family", "sans-serif")
            .selectAll("g")
            .data(chords.groups)
            .join("g");

        group
            .append("path")
            .attr("fill", (d) => colorScale(aliases[d.index]))
            .text((d) => aliases[d.index])
            .attr("d", arc);

        svg
            .append("g")
            .attr("fill-opacity", 0.8)
            .selectAll("path")
            .data(chords)
            .join("path")
            .style("mix-blend-mode", "multiply")
            .attr("fill", (d) => colorScale(aliases[d.source.index]))
            .attr("stroke-width", ".2")
            .attr("d", ribbon)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave);

        svg.on("click", onChordFocus);

        function onChordFocus(e) {
            const sourceIndex = e.target["__data__"].source.index;
            const targetIndex = e.target["__data__"].target.index;
            //document.querySelector("#chord_dataviz").innerHTML = null;
            props.onChord({ sourceIndex, targetIndex });
        }

    }, [data, props.chordScopeChange]);
    /*
        useEffect(resetChord, [props.test]);
        function resetChord() {
            console.log("props.model.test changed");
            document.querySelectorAll('.tooltip').forEach(element => {
                element.remove();
            });
            document.querySelector("#chord_dataviz").innerHTML = null;
    
            group = svg
                .append("g")
                .attr("font-size", 10)
                .attr("font-family", "sans-serif")
                .selectAll("g")
                .data(chords.groups)
                .join("g");
    
            group
                .append("path")
                .attr("fill", (d) => colorScale(aliases[d.index]))
                .text((d) => aliases[d.index])
                .attr("d", arc);
    
            svg
                .append("g")
                .attr("fill-opacity", 0.8)
                .selectAll("path")
                .data(chords)
                .join("path")
                .style("mix-blend-mode", "multiply")
                .attr("fill", (d) => colorScale(aliases[d.source.index]))
                .attr("stroke-width", ".2")
                .attr("d", ribbon)
                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseleave", mouseleave);
            //.on("click", onChordFocus);
    
            Tooltip = d3.select("#my_dataviz")
                .append("div")
                .style("opacity", 0)
                .attr("class", "tooltip")
                .style("background-color", "black")
                .style("border", "solid")
                .style("border-width", "2px")
                .style("border-radius", "5px")
                .style("padding", "5px")
                .style("width", "240px")
            //document.querySelector("#chord_dataviz").innerHTML = null;
            //document.querySelector("#chord_dataviz").innerHTML = null;
        }
    */
    return (
        <div id="my_dataviz">
            <div className="column affinity-chord-description">
                <h1>Affinity</h1>
                <p>The following chord diagram show the affinity between all the student
                    based on their open answers. Hover the mouse over the ribbons to display
                    more information. Click on the ribbon to read details.
                </p>
            </div>

            <svg ref={svgRef} id="chord_dataviz" className="third-party"></svg>
        </div>)
}

export default observer(Chord);

/*
const width = 600;
    const height = 600;
    const innerRadius = 216;
    const outerRadius = 224;
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
    

    // create the svg area
    //document.querySelector("#my_dataviz").innerHTML = "";
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `"translate(220,220)`)

    // give this matrix to d3.chord(): it will calculates all the info we need to draw arc and ribbon
    var res = d3.chord(shapedData)
        .padAngle(0.02)     // padding between entities (black arc)
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
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
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
            .radius(208)
        )
        .style("fill", "#69b3a2")
        .style("stroke", "none");

*/

/*
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
*/

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