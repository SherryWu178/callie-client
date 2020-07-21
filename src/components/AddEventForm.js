import React, {useState} from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import DatetimeRangePicker from 'react-datetime-range-picker';
import axios from 'axios'
import { BASE_URL } from './constants'
import moment from 'moment'
import { token } from '../helpers/token'


const AddEventForm = ({ActivityList}) => {
    var CurrentDate = moment();  
    const [eventTitleValue, setEventTitleValue] = useState("");
    const [activityValue, setActivityValue] = useState("");
    const [StartTimeValue, setStartTimeValue] = useState(CurrentDate);
    const [EndTimeValue, setEndTimeValue] = useState(CurrentDate);
    const [completion, setCompletion] = useState(false);
    const [useSelect, setUseSelect] = useState(true);


    const getActivityId = (string) => {
        var activityId = ActivityList[0].id
        for (var i = 0; i < ActivityList.length; i++){
            if (string === ActivityList[i].title){
                activityId = ActivityList[i].id
            } 
        }
        return activityId;
    }

    const handleSubmit = (e) => {
        var activityId = getActivityId(activityValue)
        console.log(StartTimeValue);
        console.log(EndTimeValue);
        console.log(new Date(EndTimeValue) - new Date(StartTimeValue));
        const config = {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        };

        axios.post(`${BASE_URL}/api/v1/events`,
            {   title: eventTitleValue,
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
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const handleChange = (e) => {setCompletion(e.target.checked); console.log("is it completed: " + completion)}
    
    return (
      <div>
            <p>Add New Event</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formGroupTitle">
                    <Form.Control type="title" placeholder="Title" value={eventTitleValue} onChange={(e)=>setEventTitleValue(e.target.value)}/>
                </Form.Group>
                
                <Form.Row>
                    <Form.Group as={Col} controlId="formControlSelect">
                        <Form.Control 
                            as="select" 
                            value={useSelect} 
                            onChange={(e)=>{setUseSelect(!useSelect)}}>
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
                            onChange={(e)=>setActivityValue(e.target.value)}
                            >
                        {ActivityList.reverse().map(activity=>
                            <option key={activity.id} value ={activity.title}>{activity.title}</option>)}
                        </Form.Control>
                    </Form.Group>
                    :   <Form.Group as={Col} controlId="formGroupTitle">
                        <Form.Control 
                            type="title" 
                            value={activityValue} 
                            onChange={(e)=>setActivityValue(e.target.value)}
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
                                    onStartDateChange = {e=>setStartTimeValue(e)}
                                    onEndDateChange = {e=>setEndTimeValue(e)}
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
                                onChange={handleChange}/>
                                {console.log(completion)}
                      </Form.Group>
      
                <Button variant="primary" type="submit">
                    Submit
                </Button>            
            </Form> 
        </div>
    );
  }
 
export default AddEventForm
