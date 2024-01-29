import { useEffect, useState, } from 'react'
import { observer } from "mobx-react-lite";
import { getSkillsLabelList, populateChordMatrix, populateChordMatrixByTopic, populateSkillsRank } from "./utilities";
import './App.css';

import WordCloud from './components/WordCloud.jsx';
import Chord from './components/Chord.jsx';
import ChordControllers from './components/ChordControllers.jsx';
import RankControllers from './components/RankControllers.jsx';
import SkillsBarRank from './components/SkillsBarRank.jsx';
import CommunDetail from './components/CommunDetail.jsx';
import SideNavigation from './components/SideNavigation.jsx';
import PersonDetailView from './components/PersonDetailView.jsx';
import { createHashRouter, RouterProvider } from 'react-router-dom';


function App(props) {

  function isBorn() {
    console.log('App is Born');
    props.model.chordMatrix = Array.from({ length: 41 }, () => Array(41).fill(null));
    populateChordMatrix(props.model.chordMatrix, props.model.getStudents());

    populateSkillsRank(props.model.skillsRanking, props.model.getStudents(), 0);
    //console.table(props.model.skillsRanking);
    //populateSkillsRank();
  }

  useEffect(isBorn, []);

  const aliases = props.model.getStudents().map((student) => { return student.alias });

  function matrixManipulationHandler(topic) {
    props.model.test = !props.model.test;
    props.model.currentChord.topic = topic;
    console.log(props.model.currentChord.topic);
    if (topic === "all")
      populateChordMatrix(props.model.chordMatrix, props.model.getStudents());

    if (topic !== "all")
      populateChordMatrixByTopic(props.model.chordMatrix, props.model.getStudents(), topic);
  }

  function currentChordHandler(customEvent) {
    props.model.currentChord.studentA = props.model.getStudents()[customEvent.targetIndex];
    props.model.currentChord.studentB = props.model.getStudents()[customEvent.sourceIndex];
    console.log(props.model.currentChord);
  }

  function clearCurrentChordHandler() {
    props.model.currentChord.studentA = null;
  }

  function rankManipulationHandler(skillIndex) {
    props.model.skillScopeChange = !props.model.skillScopeChange;
    console.log(skillIndex);
    populateSkillsRank(props.model.skillsRanking, props.model.getStudents(), skillIndex);
  }

  function makeRouter(model) {
    return createHashRouter([
      {
        path: "/",
        element: <h1>Hello!</h1>
      }, {
        path: "/affinity",
        element: <Chord test={model.test} data={model.chordMatrix} labels={aliases} onChord={currentChordHandler} />
      }, {
        path: "/skills",
        element: <SkillsBarRank skillsRanking={model.skillsRanking} skillScopeChange={model.skillScopeChange} />
      }
    ])
  }

  return <div className='app-container'>
    <SideNavigation model={props.model} skillsFilterLabels={getSkillsLabelList(props.model.getStudents()[0].skills)} />
    {props.model.currentChord.studentA ?
      <CommunDetail
        onClearCurrentChord={clearCurrentChordHandler}
        studentA={props.model.currentChord.studentA}
        studentB={props.model.currentChord.studentB}
        topic={props.model.currentChord.topic}
      /> : null}
    <PersonDetailView person={props.model.getStudents()[8]} />
    <RouterProvider className="mainContent" router={makeRouter(props.model)} />
  </div>;
}
export default observer(App);

/*
{<ChordControllers onMatrixManipulation={matrixManipulationHandler} />
    {props.model.chordMatrix.length > 0 ?
      <Chord
        test={props.model.test}
        data={props.model.chordMatrix}
        labels={aliases}
        onChord={currentChordHandler}
    /> : null}

    <SkillsBarRank skillsRanking={props.model.skillsRanking} skillScopeChange={props.model.skillScopeChange} />
    <RankControllers
      onRankManipulation={rankManipulationHandler}
      skillsLabel={getSkillsLabelList(props.model.getStudents()[0].skills)} />
    {props.model.currentChord.studentA ?
      <CommunDetail
        onClearCurrentChord={clearCurrentChordHandler}
        studentA={props.model.currentChord.studentA}
        studentB={props.model.currentChord.studentB}
        topic={props.model.currentChord.topic}
      /> : null}



*/





//    <Chord data={props.model.chordMatrix} labels={aliases} students={props.model.getStudents()} />
//<WordCloud plainWordsString={props.model.getAllAbouts()} />
//<Chord students={props.model.getStudents()}/>
/*   <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>*/
