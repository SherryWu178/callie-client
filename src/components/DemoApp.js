import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { token } from '../helpers/token'
import { userId } from '../helpers/userId'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid';
import moment from 'moment'
import interactionPlugin from '@fullcalendar/interaction';
import { BASE_URL } from './constants'


export default class DemoApp extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
        events: [],
    }
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
          obj.editable = false;
        } 
      }
      return json;
    };

    handleEventClick = (e) => {
      this.props.handleCurrentEventChange(e)
    } 
    
    editEvent = (event, config) => {
        axios.patch(`${BASE_URL}/api/v1/events/${event.id}`,
        {
            start_time: event.start,
            end_time: event.end,
            duration: moment.duration(moment(event.end, 'YYYY/MM/DD HH:mm')
            .diff(moment(event.start, 'YYYY/MM/DD HH:mm'))
            ).asHours(),
        }, config
      )
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    createEvent = (event, config) => {
      axios.post(`${BASE_URL}/api/v1/events`,
      {   title: event.title,
          activity_id: event.extendedProps.activity_id,
          start_time: event.start,
          end_time: event.end,
          duration: moment.duration(moment(event.end, 'YYYY/MM/DD HH:mm')
          .diff(moment(event.start, 'YYYY/MM/DD HH:mm'))
          ).asHours(),
          completion: false,
      }, config
    )
    .then(function (response) {
      console.log(response);
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
  }


    editDeadline = (event, config) =>{
      console.log("editDeadline")
        axios.patch(`${BASE_URL}/api/v1/deadlines/${event.id}`,
          {
              datetime: event.start,
          }, config
        )
        .then(function (response) {
          console.log(response);
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
  }
    

    handleDropAndDrag = (eventDropInfo) => {
      const event = eventDropInfo.event
      const config = {
          headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-type': 'application/json',
          }
      };
      console.log(eventDropInfo.event)
      const oldDeadline = eventDropInfo.oldEvent.allDay
      const newDeadline = event.allDay
      if (oldDeadline){
        if (newDeadline){
          this.editDeadline(event, config)
        } else {
          this.createEvent(event, config)
        }
      }else{
        this.editEvent(event, config)
      }
  }


  render() {
    const reformatted = this.reformatJson(this.state.events)
    return (
      <div >
        <FullCalendar 
          defaultView="timeGridWeek"
          firstDay ={1}
          plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]} 
          height={600}
          contentHeight={600}
          width= {150}
          editable={true}
          slotMinTime = "07:00:00"
          eventClick = {this.handleEventClick}
          events={reformatted}
          header={{left: 'dayGridMonth,timeGridWeek,timeGridDay', center: 'title'}}
          eventDrop = {this.handleDropAndDrag}
          eventResize = {this.handleDropAndDrag}
          allDayText='Deadline'/>
      </div>
    )
  }
}