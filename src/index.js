import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Settings from './components/Settings';
import LogInForm from './components/LogInForm';
import SignUpForm from './components/SignUpForm';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import { history } from './helpers/history'



ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/setting" component={Settings} />
        <Route path="/login" component={LogInForm} />
        <Route path="/signup" component={SignUpForm} />

      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
