import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import "./ChordControllers.css"

function ChortControllers(props) {

    const [matrixScope, setMatrixScope] = useState();

    function isBorn() {
        setMatrixScope("all");
    }
    useEffect(isBorn, []);

    function contollerHandler(e) {
        props.onMatrixManipulation(e.target.name);
        setMatrixScope(e.target.value);
    }

    return (<div className="chord-controllers column">
        <div>
            <input type="radio" onChange={contollerHandler} id="all" name="all" value="all" checked={matrixScope === "all"} />
            <label htmlFor="all"> All</label>
        </div>
        <div>
            <input type="radio" onChange={contollerHandler} id="interest" name="interest" value="interest" checked={matrixScope === "interest"} />
            <label htmlFor="interest"> Interest</label>
        </div>
        <div>
            <input type="radio" onChange={contollerHandler} id="expectation" name="expectation" value="expectation" checked={matrixScope === "expectation"} />
            <label htmlFor="expectation"> Expectation</label>
        </div>
        <div>
            <input type="radio" onChange={contollerHandler} id="relevant_exp" name="relevant_exp" value="relevant_exp" checked={matrixScope === "relevant_exp"}/>
            <label htmlFor="relevant_exp"> Relevant Experience</label>
        </div>
        <div>
            <input type="radio" onChange={contollerHandler} id="futureProjections" name="futureProjections" value="futureProjections" checked={matrixScope === "futureProjections"}/>
            <label htmlFor="futureProjections"> Future Projections</label>
        </div>
    </div>)
}

export default observer(ChortControllers);