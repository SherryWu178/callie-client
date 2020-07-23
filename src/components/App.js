import React, {Component} from 'react';
import Deadlines from './Deadlines';
import DemoApp from './DemoApp';
import WebScrapForm from './WebScrapForm';
import NavBar from './NavBar';
import RightSideBar from './RightSideBar';

import '../styles/App.css';
import '../styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentEvent: null
    }
  }

  handleCurrentEventChange = (e) => {
    this.setState({
      currentEvent: e.event
    })
    console.log(this.state.currentEvent)
  }


  render(){
    const {currentEvent} = this.state;
    const login = localStorage.getItem('user')===null
    var className = "normal"
    if (login) {
        className = "overlay-opacity"
    }
    
    return (
    <React.Fragment>
        <div>
          <NavBar currentUser = {JSON.parse(localStorage.getItem('user'))}/>
        </div>
        <div className = {className} >
          <div className="App-body">
              <div className="row">
                <div className="col-md-8">
                  <DemoApp handleCurrentEventChange = {this.handleCurrentEventChange}/>
                </div>
                <div className="col-md-4">
                  <RightSideBar currentEvent = {currentEvent} handleCurrentEventChange = {this.handleCurrentEventChange}/>
                </div>
              </div>
          </div>
        </div>
        {login
        ? <div className="overlay">
          <h1>Log in to experience the app</h1>
        </div>
        : <div></div>}
        
    </React.Fragment>
        
    );
  }
}


export default App;
