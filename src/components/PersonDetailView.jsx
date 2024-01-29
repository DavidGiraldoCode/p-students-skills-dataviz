import { observer } from "mobx-react-lite"
import "./PersonDetailView.css";

function PersonDetailView(props) {

    function onClose(){
        props.onCloseDetail();
    }

    return <div className="person-details-view">
        <button className="close" onClick={onClose}>Close</button>
        <div className="alias">
            <label>Alias</label>
            <h2>{props.person.alias}</h2>
        </div>
        <div className="education column">
            <h4>🎓 Education</h4>
            <div className="education-details">
                <p><label>University</label> <br /> {props.person.university}</p>
                <p><label>Starting year</label> <br /> {props.person.starttingYear} </p>
                <p><label>{props.person.degree}</label> <br /> {props.person.major}</p>
                <p><label>Gradiation year</label> <br /> {props.person.graduatingYearMonth}</p>
            </div>
            <p><label>Thesis status</label> <br /> Have not started planning for it.</p>
        </div>
        <div className="about-details column">
            <h4>💙 About</h4>
            <p><label>Interest</label> <br />{props.person.about.interest !== "NaN" ? props.person.about.interest : "Did not answer"}</p>
            <p><label>Expectatios</label> <br />{props.person.about.expectation !== "NaN" ? props.person.about.expectation : "Did not answer"}</p>
            <p><label>Relevant experience</label> <br />{props.person.about.relevant_exp !== "NaN" ? props.person.about.relevant_exp : "Did not answer"}</p>
            <p><label>Future projections</label> <br />{props.person.about.futureProjections !== "NaN" ? props.person.about.futureProjections : "Did not answer"}</p>
        </div>
        <div className="skills-details column">
            <h4>💪 Hard & Soft skills</h4>
            <div className="skills-wraper">
                {props.person.skills.map(
                    (skill) => {

                        return <div className="skill-level">
                            <label>{skill.skillname}</label>
                            <div class="skill-container">
                                <div class="skill" style={{ width: `${skill.value * 10}%` }} >
                                    <label>.</label>
                                </div>
                            </div>
                        </div>
                    }
                )}
            </div>
        </div>
        <div className="adding-person">
            <button>Add to group</button>
        </div>
    </div>
}

export default observer(PersonDetailView)