import React, {Component} from 'react';
import Deadlines from './Deadlines';
import DemoApp from './DemoApp';
import WebScrapForm from './WebScrapForm';

import RightSideBar from './RightSideBar';

import '../styles/App.css';
import '../styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  
  render(){
    return (
        <div className="App-body">
          {/* <WebScrapForm/>  */}
            <div className="row">
              <div className="col-md-8">
                <DemoApp classNameName="App-body"/>
              </div>
              <div className="col-md-4">
                <RightSideBar/>
              </div>
            </div>
        </div>
    );
  }
}


export default App;
