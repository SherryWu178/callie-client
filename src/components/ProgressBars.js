import React, {useState, useEffect} from 'react';
import {ProgressBar} from 'react-bootstrap'
import '../styles/ProgressBars.css';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';


const ProgressBars = ({ActivityList, EventList}) => {

    function checkDatetime(e){
        var startOfWeek = moment().startOf('isoWeek').toDate();
        var endOfWeek   = moment().endOf('isoWeek').toDate();
        var date1 = new Date(e.start_time)
        var date2 = new Date(e.start_time)
        return date1 >= startOfWeek && date2 <= endOfWeek;
          
      }

    var filtered = EventList.filter(checkDatetime);
    console.log(filtered)

    var map = new Map();
    for (var i = 0; i < filtered.length; i++) {
        if (map.has(filtered[i].activity_id.toString())){
            map.set(
                filtered[i].activity_id.toString(), 
                map.get(filtered[i].activity_id.toString()) + filtered[i].duration);
        } else {
            map.set(
                filtered[i].activity_id.toString(), 
                filtered[i].duration);
        }
    }

    console.log(map)

    return(
    <div >
        <h3>Your Progress For The Week</h3>
        {ActivityList.map(activity=>
        <div key={activity.id}>
            {activity.title} <ProgressBar variant = "info" now={(map.get(activity.id.toString())*(10))} />
        </div>)}
    </div>
    )
}

export default ProgressBars
