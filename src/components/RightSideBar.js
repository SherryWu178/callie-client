import React, {Component, setState} from 'react';
import axios from 'axios';
import ProgressBars from './ProgressBars';
import AddEventForm from './AddEventForm';
import '../styles/RightSideBar.css';
import { BASE_URL } from './constants';



class RightSideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
        activities: [],
        events: []
    }
  }

  getEvents(){ 
    axios.get(`${BASE_URL}/api/v1/events`)
    .then(response => {
      console.log("activities retrieved.")
      this.setState({events:response.data})
    })
    .catch(error => {
      console.log("Error!!!")
      console.log(error)
    })
}


  getActivity(){
    axios.get(`${BASE_URL}/api/v1/activities`)
    .then(response => {
      console.log("activities retrieved.")
      this.setState({activities: response.data})
    })
    .catch(error => {
      console.log("Error!!!")
      console.log(error)
    })
  }



  componentDidMount() {
    this.getActivity()
    this.getEvents()
  }



  render(){
    const {activities, events} = this.state    
    return (
        <div className="App-body">
          <div className="outer">
            <div className="inner">
              <AddEventForm ActivityList = {activities}/>
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

