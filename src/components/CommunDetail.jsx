import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import "./CommunDetail.css";

function CommunDetail(props) {

    const topics = {
        "interest": "Interests",
        "expectation": "Course expectations",
        "relevant_exp": "Relevant experience",
        "futureProjections": "Future projections"
    }

    function getStudentAboutDetails(student) {
        return (<div className="student-about-details">
            <h2>{student.alias}</h2>
            <h4>{topics[props.topic]}</h4>
            <p>{student.about[props.topic]}</p>
        </div>)
    }

    function cleanCurrentChordHandler(e) {
        props.onClearCurrentChord();
    }

    return (<div className="commun-detail right-side-bar">
        <button onClick={cleanCurrentChordHandler}>Close</button>
        {getStudentAboutDetails(props.studentA)}
        {getStudentAboutDetails(props.studentB)}
    </div>)
}

export default observer(CommunDetail);