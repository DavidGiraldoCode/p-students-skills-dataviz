import { observer } from "mobx-react-lite"
import { useState, useEffect } from "react";
import { getSkillsLabelList } from "../utilities";
import "./RankControllers.css";

function RackControllers(props) {

    const [rankScope, setRankScope] = useState();
    function isBorn() {
        setRankScope("all");
    }
    useEffect(isBorn, []);

    function contollerHandler(e) {
        setRankScope(e.target.name);
        props.onRankManipulation(e.target.value);
    }

    function renderSkillRadioFilters(skill, index) {
        return (<div>
            <input type="radio" onChange={contollerHandler} key={skill} id={skill} name={skill} value={index} checked={rankScope === skill} />
            <label htmlFor={skill}>{skill}</label>
        </div>)
    }

    return (<div className="rank-controllers container">
        <div>
            <input type="radio" onChange={contollerHandler} id="all" name="all" value="all" checked={rankScope === "all"} />
            <label htmlFor="all">All</label>
        </div>
        {props.skillsLabel.map(renderSkillRadioFilters)}
    </div>)
}

export default observer(RackControllers)