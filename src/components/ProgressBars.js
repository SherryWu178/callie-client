import React, {useState, useEffect} from 'react';
import {ProgressBar} from 'react-bootstrap'
import '../styles/ProgressBars.css';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Settings.css';


const ProgressBars = ({ActivityList, EventList}) => {

    function checkDatetime(e){
        var startOfWeek = moment().startOf('isoWeek').toDate();
        var endOfWeek   = moment().endOf('isoWeek').toDate();
        var date1 = new Date(e.start_time)
        var date2 = new Date(e.start_time)
        return date1 >= startOfWeek && date2 <= endOfWeek;
      }

    const filtered = EventList.filter(checkDatetime);
    console.log(filtered)

    function checkComplete(e){
        return e.completion
    }

    function checkUncompleted(e){
        return !e.completion
    }
    
    var completed = filtered.filter(checkComplete);
    var uncompleted = filtered.filter(checkUncompleted);
    console.log(completed)
    console.log(uncompleted)


    var Complete = new Map();
    for (var i = 0; i < completed.length; i++) {
        if (Complete.has(completed[i].activity_id.toString())){
            Complete.set(
                completed[i].activity_id.toString(), 
                Complete.get(completed[i].activity_id.toString()) + completed[i].duration);
        } else {
            Complete.set(
                completed[i].activity_id.toString(), 
                completed[i].duration);
        }
    }

    var InComplete = new Map();
    for (var i = 0; i < uncompleted.length; i++) {
        if (InComplete.has(uncompleted[i].activity_id.toString())){
            InComplete.set(
                uncompleted[i].activity_id.toString(), 
                InComplete.get(uncompleted[i].activity_id.toString()) + uncompleted[i].duration);
        } else {
            InComplete.set(
                uncompleted[i].activity_id.toString(), 
                uncompleted[i].duration);
        }
    }

    return(
    <div >
        <h3>Your Progress For The Week</h3>
        
        {
        ActivityList.map(activity=>{
            var totalCompletedHour = Complete.get(activity.id.toString())
            var totalInCompletedHour = InComplete.get(activity.id.toString())
            var ConpletePercent = Math.round(totalCompletedHour*100/activity.target)
            var InConpletePercent = Math.round(totalInCompletedHour*100/activity.target)

            if (!ConpletePercent){
                ConpletePercent = 0
            }

            if (!InConpletePercent){
                InConpletePercent = 0
            }
            return  <div key={activity.id} >
                        {activity.title}
                        <ProgressBar >
                            <ProgressBar 
                                label = {ConpletePercent+"%"}
                                now = {ConpletePercent} 
                                className="progress-bar-complete"
                            />
                            <ProgressBar 
                                label = {InConpletePercent+"%"}
                                now = {InConpletePercent} 
                                className="progress-bar-incomplete"
                            />

                        </ProgressBar>
                        
                    </div>
        })
        }
    </div>
    )
}

export default ProgressBars

// var filtered = EventList.filter(checkDatetime);
//     var completed = filtered.filter(checkComplete);
//     var uncompleted = filtered.filter(checkUncompleted);


//     var mapForCompleted = new Map();
//     var mapForUncompleted = new Map();

//     for (var i = 0; i < completed.length; i++) {
//         if (mapForCompleted.has(completed[i].activity_id.toString())){
//             mapForCompleted.set(
//                 completed[i].activity_id.toString(), 
//                 mapForCompleted.get(completed[i].activity_id.toString()) + completed[i].duration);
//         } else {
//             mapForCompleted.set(
//                 completed[i].activity_id.toString(), 
//                 completed[i].duration);
//         }
//     }

//     for (var i = 0; i < uncompleted.length; i++) {
//         if (mapForUncompleted.has(uncompleted[i].activity_id.toString())){
//             mapForUncompleted.set(
//                 completed[i].activity_id.toString(), 
//                 mapForUncompleted.get(uncompleted[i].activity_id.toString()) + uncompleted[i].duration);
//         } else {
//             mapForUncompleted.set(
//                 uncompleted[i].activity_id.toString(), 
//                 uncompleted[i].duration);
//         }
//     }

//     return(
//     <div >
//         <h3>Your Progress For The Week</h3>
        
//         {
//         ActivityList.map(activity=>{
//             var now = Math.round(mapForCompleted.get(activity.id.toString())/(activity.target))
//             if (!now){
//                 now = 0
//             }
//             return  <div key={activity.id}>
//                         {activity.title}
//                         <ProgressBar 
//                         label = {now+"%"}
//                         now = {now} 
//                         />
//                     </div>
//         })
//         }
//     </div>
//     )