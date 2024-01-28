import React from 'react'
import ReactDOM from 'react-dom/client'
import model from './SkillsModel.js';

import { observable, configure, reaction } from 'mobx';
configure({ enforceActions: "never", });
const reactiveModel = observable(model);

import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App model={reactiveModel} />
  </React.StrictMode>,
)

window.myModel= reactiveModel; 