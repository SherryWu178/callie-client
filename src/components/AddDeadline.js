import React, {useState} from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import Datetime from 'react-datetime';
import axios from 'axios'
import { BASE_URL } from './constants'
import moment from 'moment'
import { history } from '../helpers/history'
import { token } from '../helpers/token'


const AddDeadline = ({ActivityList}) => {
    var CurrentDate = moment();  
    const [eventTitleValue, setEventTitleValue] = useState("");
    const [activityValue, setActivityValue] = useState("");
    const [StartTimeValue, setStartTimeValue] = useState(CurrentDate);
    const [completion, setCompletion] = useState(false);
    const [useSelect, setUseSelect] = useState(true);
    const [error,setError] = useState({});
    var activityId = 0


    const getActivityId = (string) => {
        var activityId = ActivityList[0].id
        for (var i = 0; i < ActivityList.length; i++){
            if (string === ActivityList[i].title){
                activityId = ActivityList[i].id
            } 
        }
        return activityId;
    }

    const submitEvent = (e) => {
        const config = {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        };
        
        axios.post(`${BASE_URL}/api/v1/deadlines`,
                {   title: eventTitleValue,
                    activity_id: activityId,
                    datetime: StartTimeValue,
                    completion: completion,
                    allDay: true
                }, config
            )
            .then(function (response) {
                console.log(response);
                // history.push('/'); 
                // window.location.reload(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleSubmit = (e) => {
        const config = {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        };
                
        if (!useSelect){
            e.preventDefault();
            axios.post(`${BASE_URL}/api/v1/activities`,{
                title: activityValue,
                target: 10
            },config
            )
            .then(function (response) {
                console.log(response);
                activityId = response.data.id
                submitEvent()
              })
            .catch(function (error) {
                console.log(error);
            });

            
        }else{
            activityId = getActivityId(activityValue)
            submitEvent(e)

        }
        }

    const handleChange = (e) => {setCompletion(e.target.checked);}
    
    const handleDuplicate = (e) => {
        var invalid = false
        for (var i = 0; i <ActivityList.length; i++){
            if(ActivityList[i].title === e.target.value){
                invalid = true
            }
        }
        if (invalid === true) {
            setError(1)
        } else {
            setError({})
            setActivityValue(e.target.value)
        }
    }

    return (
      <div>
            <p>Add New Deadline</p>
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
                            <option key={1} value={true}>Select Tag</option>
                            <option key={2} value={false}>Create New Tag</option>
                        </Form.Control>
                    </Form.Group>
                    {useSelect                     
                    ? 
                    <Form.Group as={Col} controlId="formControlSelect">
                        <Form.Control 
                            as="select" 
                            value={activityValue} 
                            onChange={(e)=>setActivityValue(e.target.value)}
                            >
                        {ActivityList.map(activity=>
                            <option key={activity.id} value ={activity.title}>{activity.title}</option>)}
                        </Form.Control>
                    </Form.Group>
                    :   <Form.Group as={Col} controlId="formGroupTitle">
                        <Form.Control 
                            type="title" 
                            value={activityValue} 
                            onChange={handleDuplicate}
                            isValid ={false}
                            />
                    {error === 1 && 
                    <Form.Text style={{color: "red"}} >Existing tag</Form.Text>}
                        </Form.Group>
                    }
                </Form.Row>
                
                <Form.Group>
                    <Form.Row>
                        <Col sm={2}>
                            <Form.Row>Deadline:</Form.Row>
                        </Col>          
                        <Col sm={7}>
                            <Datetime 
                            value={StartTimeValue}
                            onChange = {e=>setStartTimeValue(e)}
                            dateFormat = "DD-MM-YYYY"
                                    //startTimeConstraints ={{ minutes: {  step:15 }}}
                                    //endTimeConstraints ={{ minutes: {  step:15 }}}
                                    //inputProps ={{placeholder: dateTime_for_input}}
                                    >
                            </Datetime>
                        </Col>
                    </Form.Row>
                </Form.Group>
                
                <Form.Group controlId="formBasicCheckbox">
                            <Form.Check 
                                type="checkbox" 
                                label="Mark as completed" 
                                checked={completion}
                                onChange={handleChange}/>
                      </Form.Group>
      
                <Button variant="primary" type="submit">
                    Submit
                </Button>            
            </Form> 
        </div>
    )
}
 
export default AddDeadline
