import React, {Component, setState} from 'react';
import axios from 'axios';
import ProgressBars from './ProgressBars';
import AddEventForm from './AddEventForm';
import EditEventForm from './EditEventForm';
import '../styles/RightSideBar.css';
import { BASE_URL } from './constants';
import { token } from '../helpers/token'
import { userId } from '../helpers/userId'



class SingleActivity extends Component {
  constructor(props) {
    super(props)
    this.state = {
        edit: false,
        newTarget: '',
    }
  }
  render(){
    const {currentEvent} = this.props
    const {activities, events} = this.state    
    return (
        <div className="App-body">
          <div className="outer">
            <div className="inner">
              {this.state.edit
                ? <AddEventForm Activity = {activities}/>
                : <EditEventForm ActivityList = {activities} currentEvent = {currentEvent}/>
              }
            </div>
            <div className="inner">
              <ProgressBars ActivityList = {activities} EventList = {events}/>
            </div>
          </div>
        </div>
    );
  }  
}


export default RightSideBar;

