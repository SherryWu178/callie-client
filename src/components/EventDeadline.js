import React, {useState} from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import AddEventForm from './AddEventForm';
import EditEventForm from './EditEventForm';
import AddDeadline from './AddDeadline';
import '../styles/Settings.css';




const EventDeadline = ({ActivityList, currentEvent, handleCurrentEventChange}) => {
    const [useEvent, setUseEvent] = useState(true);
    const handleE = (useEvent) => {
        setUseEvent(true)
    }

    const handleD = (useEvent) => {
        setUseEvent(false)
    }
    return (
      <div>
      <ButtonGroup>
      <Button className = "button-long" variant="outline-secondary" onClick={handleE}>Event </Button>
      <Button className = "button-long" variant="outline-secondary" onClick={handleD}>Deadline</Button>
      </ButtonGroup>
      {console.log(currentEvent === null)}
            {useEvent
            ? currentEvent === null
                ? <AddEventForm ActivityList = {ActivityList}/>
                : <EditEventForm 
                ActivityList = {ActivityList} 
                handleCurrentEventChange = {handleCurrentEventChange} 
                currentEvent = {currentEvent}/>
            :<AddDeadline ActivityList={ActivityList}/>}
        </div>
    )
}
 
export default EventDeadline

