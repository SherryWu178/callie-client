import React, {Component, setState} from 'react';
import axios from 'axios';
import ProgressBars from './ProgressBars';
import AddEventForm from './AddEventForm';
import EditEventForm from './EditEventForm';
import '../styles/RightSideBar.css';
import { BASE_URL } from './constants';
import { token } from '../helpers/token'
import { userId } from '../helpers/userId'



class ManageActivity extends Component {
  constructor(props) {
    super(props)
    this.state = {
        activities: [],
    }
  }

  getActivity(){
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    axios.get(`${BASE_URL}/api/v1/users/${userId}`, config)
    .then(response => {
      console.log("activities retrieved." + response.data.activities)
      this.setState({activities: response.data.activities})
    })
    .catch(error => {
      console.log("Error!!!")
      console.log(error)
    })
  }


  componentDidMount() {
    this.getActivity()
  }


  render(){
    const {currentEvent} = this.props
    const {activities, events} = this.state    
    return (
        <div className="App-body">
          <div className="outer">
            <div className="inner">
              {console.log('currentEvent: ' + currentEvent)}
              {this.props.currentEvent === null
                ? <AddEventForm ActivityList = {activities}/>
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

