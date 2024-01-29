import { useEffect, useRef, useState } from 'react'
import { observer } from "mobx-react-lite";
import { populateSkillsRank } from '../utilities';
import * as d3 from "d3";

function SkillsBarRank(props) {
    const [data, setData] = useState(props.skillsRanking);
    const svgRef = useRef();

    //setData(props.skillsRanking);
    // isBorn DOES NOT WORK
    /*function isBorn() {
        console.log(props.skillsRanking);
        console.log(props.students)
        populateSkillsRank(props.skillsRanking, props.students, 0);
    }
    useEffect(isBorn, []);*/
    useEffect(() => {
        svgRef.current.innerHTML="";
        // set the dimensions and margins of the graph
        var margin = { top: 40, right: 40, bottom: 40, left: 80 },
            width = 800 - margin.left - margin.right,
            height = 640 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // Add X axis
        var x = d3.scaleLinear()
            .domain([0, 10])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + 0 + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(0,-24)rotate(0)")
            .style("text-anchor", "end");

        // Y axis
        var y = d3.scaleBand()
            .range([0, height])
            .domain(data.map(function (d) { return d.alias; }))
            .padding(.1);
        svg.append("g")
            .call(d3.axisLeft(y))


        //-----------------------
        // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
        // Its opacity is set to 0: we don't see it by default.
        // create a tooltip
        function getSomething(e) {
            console.log(e);
            //return `${sourceStudent} and ${targetStudent} </br> You have ${coincidencies} commun topics`
            //console.log(`${sourceStudent} and ${targetStudent} have ${coincidencies} commoun topics`);
        }

        let inside = false;

        let Tooltip = d3.select("#my_dataviz")
            .append("div")
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
                        .html('Hello')
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
        }
        //-----------------------    

        //Bars
        svg.selectAll(".bar")
            .data(data)
            .join('rect')
            .attr("x", x(0))
            .attr("y", function (d) { return y(d.alias); })
            .attr("width", function (d) { return x(d.skillLevel); })
            .attr("height", y.bandwidth())
            .attr("margin-bottom", 46 + "px")
            .attr("fill", "#646cff")
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave);

    }, [data, props.skillScopeChange]);



    return (
        <div id="my_dataviz" className="skills-bar-rank">
            <svg ref={svgRef}></svg>
            {/* Leave this empty div for D3 rendering */}
        </div>
    );
}

export default observer(SkillsBarRank);