import { observer } from "mobx-react-lite";
import "./SideNavigation.css";
import { useState } from "react";
import RankControllers from "./RankControllers";
import ChordControllers from "./ChordControllers";
import { populateSkillsRank, populateChordMatrix, populateChordMatrixByTopic } from "../utilities";

function SideNavigation(props) {

    const [affinityTab, setAffinityTab] = useState({ hash: "affinity", label: "Affinity", focus: true });
    const [skillTab, setSkillTab] = useState({ hash: "skills", label: "Skills", focus: false });

    function rankManipulationHandler(skillIndex) {
        props.model.skillScopeChange = !props.model.skillScopeChange;
        //console.log(skillIndex);
        populateSkillsRank(props.model.skillsRanking, props.model.getStudents(), skillIndex);
    }

    

    function matrixManipulationHandler(topic) {
        props.model.chordScopeChange = !props.model.chordScopeChange;
        props.model.currentChord.topic = topic;
        props.model.currentChord.studentA = null;
        console.log(props.model.currentChord.topic, props.model.chordScopeChange);
        if (topic === "all")
            populateChordMatrix(props.model.chordMatrix, props.model.getStudents());

        if (topic !== "all")
            populateChordMatrixByTopic(props.model.chordMatrix, props.model.getStudents(), topic);
    }

    function renderFilterOptions() {
        return <div>
            {affinityTab.focus ? <ChordControllers onMatrixManipulation={matrixManipulationHandler} /> : null}
            {skillTab.focus ? <RankControllers  onRankManipulation={rankManipulationHandler} skillsLabel={props.skillsFilterLabels} /> : null}
        </div>
    }

    function renderNavTab(tab) {

        function onFocusTab(e) {
            window.location.hash = `/${tab.hash}`
            if (tab.hash === "affinity") {
                setAffinityTab({
                    ...affinityTab,
                    focus: true
                });
                setSkillTab({
                    ...skillTab,
                    focus: false
                });
            } else if (tab.hash === "skills") {
                setAffinityTab({
                    ...affinityTab,
                    focus: false
                });
                setSkillTab({
                    ...skillTab,
                    focus: true
                });
            }
        }
        return <div>
            <button id={tab.hash} onClick={onFocusTab}>{tab.label}</button>
            {tab.focus === true ? renderFilterOptions() : null}
            <div></div>
        </div>
    }

    return (<div className="side-navigation">
        <h1>IVIS24</h1>
        <h3>Build your dream team</h3>
        <div className="tabs column">
            {renderNavTab(affinityTab)}
            {renderNavTab(skillTab)}
        </div>

    </div>)
}

export default observer(SideNavigation);