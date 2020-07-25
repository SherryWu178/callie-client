import React, {Component} from 'react';
import axios from 'axios';
import ProgressBars from './ProgressBars';
import AddEventForm from './AddEventForm';
import EditEventForm from './EditEventForm';
import '../styles/RightSideBar.css';
import { BASE_URL } from './constants';
import { token } from '../helpers/token'
import { userId } from '../helpers/userId'



class RightSideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
        activities: [],
        events: []
    }
  }


  getEvents(){
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    
    axios.get(`${BASE_URL}/api/v1/users/${userId}`, config)
    .then(response => {
      console.log("activities retrieved.")
      this.setState({events:response.data.events})
    })
    .catch(error => {
      console.log("Error!!!")
      console.log(error)
    })
}


  getActivity(){
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.get(`${BASE_URL}/api/v1/users/${userId}`, config)
    .then(response => {
      console.log(response.data.activities)

      this.setState({activities: response.data.activities})
    })
    .catch(error => {
      console.log("Error!!!")
      console.log(error)
    })
  }



  componentDidMount() {
    if (!localStorage.getItem('user') === null){
      this.getActivity()
      this.getEvents()
    }
  }



  render(){
    const {activities, events} = this.state    
    return (
        <div className="App-body">
          <div className="outer">
            <div className="inner">
              {this.props.currentEvent === null
                ? <AddEventForm ActivityList = {activities}/>
                : <EditEventForm 
                ActivityList = {activities} 
                handleCurrentEventChange = {this.props.handleCurrentEventChange} 
                currentEvent = {this.props.currentEvent}/>
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

