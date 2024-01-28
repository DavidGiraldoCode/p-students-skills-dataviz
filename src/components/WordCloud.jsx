import { observer } from "mobx-react-lite";
import * as d3 from "d3";
import cloud from "../d3.layout.cloud.js";
import { useEffect } from "react";
import { getWordsArray, getTopWords } from "../utilities";

function WordCloud(props) {

    function isBornACB() {
        layout.start();
    }
    useEffect(isBornACB, []);

    const topWords = getTopWords(getWordsArray(props.plainWordsString));

    const cloudWidth = 700;
    const cloudHight = 400;
    const layout = cloud()
        .size([cloudWidth, cloudHight])
        .words(topWords.map(function (topWord) {
            return { text: topWord.word, size: (topWord.count * 8), test: "haha" };
        }))
        .padding(2)
        .rotate(0)
        .font("Impact")
        .fontSize(function (d) { return d.size; })
        .on("end", drawCloud);

    function drawCloud(words) {
        //console.log("hey!");
        document.querySelector("#world-cloud").innerHTML = "";
        d3.select("#world-cloud").append("svg")
            .attr("width", layout.size()[0])
            .attr("height", layout.size()[1])
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function (d) { return d.size + "px"; })
            .style("font-family", "Impact")
            .attr("text-anchor", "middle")
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function (d) { return d.text; });
    }
    return <div id="world-cloud"></div>
}
export default observer(WordCloud);