import React, {useState} from 'react';
import {Form, Button,Col} from 'react-bootstrap';
import DatetimeRangePicker from 'react-datetime-range-picker';
import Axios from 'axios';


const DeleteEventForm = ({ActivityList}) => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = (today.getHours()-8) + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    const [eventTitleValue, setEventTitle] = useState("");
    const [activityValue, setActivityValue] = useState("");
    const [StartTimeValue, setStartTimeValue] = useState(dateTime);
    const [EndTimeValue, setEndTimeValue] = useState(dateTime);
    
    const getActivityId = (string) => {
        var activityId = 0
        for (var i = 0; i < ActivityList.length; i++){
            if (string === ActivityList[i].title){
                activityId = ActivityList[i].id
            } else {
                activityId = ActivityList[0].id
            }
        }
        return activityId;
    }
    const handleSubmit = (e) => {
        var activityId = getActivityId(activityValue)
        console.log(StartTimeValue);
        console.log(EndTimeValue);
        console.log(activityId);

        Axios.post('/api/v1/events',
            {
                title: eventTitleValue,
                activity_id: activityId,
                start_time: StartTimeValue,
                end_time: EndTimeValue
            }
          )
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          

    }

    
    return (
      <div>
            <p>Add New Event</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formGroupTitle">
                    <Form.Control type="title" placeholder="Title" value={eventTitleValue} onChange={(e)=>setEventTitle(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formControlSelect">
                    <Form.Label>Select Activity</Form.Label>
                    <Form.Control placeholder="Activity" as="select" value={activityValue} onChange={(e)=>setActivityValue(e.target.value)}>
                    {ActivityList.map(activity=>
                        <option key={activity.id} value ={activity.title}>{activity.title}</option>)}
                    </Form.Control>
                </Form.Group>
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
                                    >
                            </DatetimeRangePicker>
                        </Col>
                    </Form.Row>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button> 
                <Button variant="primary" type="submit">
                    Delete
                </Button>             
            </Form> 
            </div>
    );
  }
 
export default DeleteEventForm

// class AddEventForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             value: ""
//         };
//       }

    
//     render(){
//         //const [value, onChange] = useState(new Date());
//         const {StartDate, EndDate, handleSubmit, handleStartDateChange, handleEndDateChange} = this.props
//         const {value} = this.state
//         return(
//             <div>
//             Add New Event
//             <Form>
//                 <Form.Group controlId="formGroupTitle">
//                     <Form.Control type="title" placeholder="Title" />
//                 </Form.Group>
//                 <Form.Group controlId="formGroupSubject">
//                     <Form.Control type="subject" placeholder="Subject" />
//                 </Form.Group>
//                 <Form.Group controlId="formDateTimeRangePicker" color="white">
//                     <DateTimeRangePicker clearAriaLabel = "clear" onChange={onChange} value={value} disableClock ={true}></DateTimeRangePicker>
//                 </Form.Group>
//                 <Button variant="primary" type="submit">
//                     Submit
//                 </Button>            
//             </Form> 
//             </div>
//         )
//     }
// }


                {/* <Form.Group controlId="formGroupTitle">
                    <Form.Control type="title" placeholder="Title" />
                </Form.Group>
                <Form.Group controlId="formGroupSubject">
                    <Form.Control type="subject" placeholder="Subject" />
                </Form.Group>
                <br/>
                <Form.Row>
                    <Col>
                    <DatePicker
                        onChange={handleStartDateChange}
                        value={StartDate}
                    />
                        
                    </Col>
                    <Col>
                        <Form.Control placeholder="Start Time" />
                    </Col>
                    -
                    <Col>
                        <Form.Control placeholder="End Time" />
                    </Col>
                    <Col>
                        <DatePicker
                            onChange={handleEndDateChange}
                            value={EndDate}
                        />                    
                    </Col>
                </Form.Row>    */}
