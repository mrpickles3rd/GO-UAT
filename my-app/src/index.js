import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { App } from './App';
import reportWebVitals from './reportWebVitals';

const customHistory = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Router history={customHistory}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
