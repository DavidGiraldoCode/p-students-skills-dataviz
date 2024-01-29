import React from 'react'
import ReactDOM from 'react-dom/client'
import { observable, configure, reaction } from 'mobx';
import model from './SkillsModel.js';
import dataset from "./students-dataset.json"
import App from './App.jsx'
import './index.css'

model.setDataSet(dataset);

if (model.modelReady) {
  console.log('Hey')
  configure({ enforceActions: "never" });
  const reactiveModel = observable(model);

  ReactDOM.createRoot(document.getElementById('root')).render(
    <App model={reactiveModel} />
  )

  window.myModel = reactiveModel;
}
