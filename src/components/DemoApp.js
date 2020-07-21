import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { token } from '../helpers/token'
import { userId } from '../helpers/userId'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { BASE_URL } from './constants'

// import '@fullcalendar/core/main.css';
// import '@fullcalendar/timegrid/main.css';

export default class DemoApp extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
        events: [],
    }
  }
  

  handleEventClick = (e) => {
    this.props.handleCurrentEventChange(e)
  } 

  deleteEvent = (e) => {
    console.log("delete")
    console.log(e.event.id)
    axios.delete(`${BASE_URL}/api/v1/events/` + e.event.id , {
      data: { id: e.event.id }
     })
  }

  getEvents() {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.get(`${BASE_URL}/api/v1/users/${userId}`, config)
    .then(response => {
      console.log("Events retrieved.")
      this.setState((state)=>({events: state.events.concat(response.data.events)}))
    })
    .catch(error => {
      console.log("Error!!!")
      console.log(error)
    })
  }

  getDeadlines() {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    axios.get(`${BASE_URL}/api/v1/users/${userId}`, config)
    .then(response => {
      console.log("Deadlinese retrieved.")
      this.setState((state)=>({events: state.events.concat(response.data.deadlines)}))
    })
    .catch(error => {
      console.log("Error!!!")
      console.log(error)
    })
  }

  componentDidMount() {
    // this.importDeadlines()
    // this.readEvents()
    this.getEvents()
    this.getDeadlines()
    console.log("User is " + localStorage.getItem('user'))
    console.log("User_id is " + localStorage.getItem('user_id'))
    console.log("Token is " + localStorage.getItem('token'))
  }
  
  reformatJson = (events) => {
    const color = ['#726a95', '#3688d8', '#a0c1b8', '#fbc687'] //purple, blue, green, yellow
      var json = events
      json = JSON.parse(JSON.stringify(json).split('"start_time":').join('"start":'));
      json = JSON.parse(JSON.stringify(json).split('"end_time":').join('"end":'));
      json = JSON.parse(JSON.stringify(json).split('"datetime":').join('"start":'));

      for(var i = 0; i < json.length; i++) {
        var obj = json[i];
        if (obj.activity_id % 4 === 0) {
          obj.backgroundColor = color[0];
        } else if (obj.activity_id % 4 === 1) {
          obj.backgroundColor = color[1];
        } else if (obj.activity_id % 4 === 2) {
          obj.backgroundColor = color[2];
        } else {
          obj.backgroundColor = color[3];
        }
        obj.borderColor = 'white';
      }

      for(var i = 0; i < json.length; i++) {
        var obj = json[i];
        if (obj.hasOwnProperty('datetime')) {
          obj.allday = true;
        } 
      }
      return json;
    };



  render() {
    const reformatted = this.reformatJson(this.state.events)
    return (
      <div >
        <FullCalendar 
          defaultView="timeGridWeek"
          firstDay ={1}
          plugins={[ timeGridPlugin ]} 
          height={600}
          contentHeight={600}
          width= {150}
          editable={true}
          slotMinTime = "07:00:00"
          eventClick = {this.handleEventClick}
          events={reformatted}
          allDayText='Deadline'/>
      </div>
    )
  }
}