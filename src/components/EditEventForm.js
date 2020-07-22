import React from 'react';
import {Form, Button, Col, ButtonGroup} from 'react-bootstrap';
import DatetimeRangePicker from 'react-datetime-range-picker';
import axios from 'axios'
import { BASE_URL } from './constants'
import moment from 'moment'
import { token } from '../helpers/token'

export default class AddEventForm extends React.Component{
    
    constructor(props) {
        super(props)
        console.log(this.props.currentEvent)
        this.state = {
            eventTitleValue: this.props.currentEvent.title,
            activityValue: '',
            StartTimeValue: this.props.currentEvent.start,
            EndTimeValue: this.props.currentEvent.end,
            completion: this.props.currentEvent.extendedProps.completion,
            useSelect: true
        
        }

        this.getActivityTitle = this.getActivityTitle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);

    }

    getActivityTitle = () => {
        const config = {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        };
        const id = this.props.currentEvent.extendedProps.activity_id;
        axios.get(`${BASE_URL}/api/v1/activities/${id}`, config)
        .then(response=>{
            console.log('activity is:' + response.data.title)
            this.setState({activityValue: response.data.title})
        })
        .catch(error => {
            console.log("Error!!!")
            console.log(error)
        })
    }

    getActivityId = (string) => {
        var activityId = this.props.ActivityList[0].id
        for (var i = 0; i < this.props.ActivityList.length; i++){
            if (string === this.props.ActivityList[i].title){
                activityId = this.props.ActivityList[i].id
            } 
        }
        return activityId;
    }
    
    deleteEvent = () => {
        console.log("delete")
        console.log(this.props.currentEvent.id)
        const config = {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            },
            data: { id: this.props.currentEvent.id }

        };
        axios.delete(`${BASE_URL}/api/v1/events/${this.props.currentEvent.id}`, config)
        window.location.reload(false);
    }

    handleSubmit = (e) => {
        console.log('submitting')
        const {eventTitleValue, StartTimeValue, EndTimeValue, completion} = this.state
        var activityId = this.getActivityId(this.state.activityValue)
        const config = {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        };
        axios.patch(`${BASE_URL}/api/v1/events/${this.props.currentEvent.id}`,
            {
                title: eventTitleValue,
                activity_id: activityId,
                start_time: StartTimeValue,
                end_time: EndTimeValue,
                duration: moment.duration(moment(EndTimeValue, 'YYYY/MM/DD HH:mm')
                .diff(moment(StartTimeValue, 'YYYY/MM/DD HH:mm'))
                ).asHours(),
                completion: completion,
            }, config
          )
          .then(function (response) {
            window.location.reload(false);
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    componentDidMount(){
        this.getActivityTitle()
    }

    componentDidUpdate(prevProps, prevState){
        console.log('changing')
        if (prevProps.currentEvent !== this.props.currentEvent){
        this.setState({
            eventTitleValue: this.props.currentEvent.title,
            StartTimeValue: this.props.currentEvent.start,
            EndTimeValue: this.props.currentEvent.end,
            completion: this.props.currentEvent.extendedProps.completion
        })
        this.getActivityTitle()
        }

    }

    changeTitle = (e) => {
        this.setState({eventTitleValue: e.target.value})
        console.log(this.state.eventTitleValue)
    }

    render(){
        const {eventTitleValue, activityValue, StartTimeValue, EndTimeValue, useSelect, completion} = this.state
        return (
            <div>
                  <p>Add New Event</p>
                  <Form onSubmit={this.handleSubmit}>
                      <Form.Group controlId="formGroupTitle">
                          <Form.Control type="title" placeholder="Title" value={eventTitleValue} onChange={this.changeTitle}/>
                      </Form.Group>
                      <Form.Row>
                    
                    <Form.Group as={Col} controlId="formControlSelect">
                        <Form.Control 
                            as="select" 
                            value={useSelect} 
                            onChange={(e)=>{this.setState(!useSelect)}}>
                            <option key={1} value={true}>Select Activity</option>
                            <option key={2} value={false}>Create New Activity</option>
                        </Form.Control>
                    </Form.Group>
                    {console.log("userSelect: " + useSelect)}
                    {useSelect                     
                    ? 
                    <Form.Group as={Col} controlId="formControlSelect">
                        <Form.Control 
                            as="select" 
                            value={activityValue} 
                            onChange={(e)=>this.setState({activityValue:e.target.value})}
                            >
                        {this.props.ActivityList.reverse().map(activity=>
                            <option key={activity.id} value ={activity.title}>{activity.title}</option>)}
                        </Form.Control>
                    </Form.Group>
                    :   <Form.Group as={Col} controlId="formGroupTitle">
                        <Form.Control 
                            type="title" 
                            value={activityValue} 
                            onChange={(e)=>this.setState({activityValue:e.target.value})}
                            />
                        </Form.Group>
                    }
                </Form.Row>
                      <Form.Group>
                          <Form.Row>
                              <Col sm={2}>
                                  <Form.Row>Start:</Form.Row>
                                  <Form.Row>End:</Form.Row>
                              </Col>          
                              <Col sm={7}>
                                  <DatetimeRangePicker 
                                          startDate={StartTimeValue}
                                          endDate={EndTimeValue}
                                          onStartDateChange = {e=>this.setState({StartTimeValue:e})}
                                          onEndDateChange = {e=>this.setState({EndTimeValue:e})}
                                          dateFormat = "DD-MM-YYYY"
                                          input={true}
                                          //startTimeConstraints ={{ minutes: {  step:15 }}}
                                          //endTimeConstraints ={{ minutes: {  step:15 }}}
                                          //inputProps ={{placeholder: dateTime_for_input}}
                                          >
                                  </DatetimeRangePicker>
                              </Col>
                          </Form.Row>
                      </Form.Group>

                      <Form.Group controlId="formBasicCheckbox">
                            <Form.Check 
                                type="checkbox" 
                                label="Mark as completed"  
                                checked={completion}
                                onChange={(e) => {this.setState({completion: e.target.checked})}}
                            />
                      </Form.Group>
      
                      <ButtonGroup>
                          <Button variant="primary" onClick={this.deleteEvent}>
                              Delete
                          </Button>
                      </ButtonGroup> 
                      &nbsp;&nbsp;
                      <ButtonGroup>
                          <Button variant="primary" type="submit">
                              Update
                          </Button>  
                      </ButtonGroup>    
                
                  </Form> 
              </div>
          );
    }
}
