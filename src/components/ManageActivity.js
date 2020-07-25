import React, {Component} from 'react';
import axios from 'axios';
import SingleActivity from './SingleActivity';
import '../styles/RightSideBar.css';
import { BASE_URL } from './constants';
import { token } from '../helpers/token'
import { userId } from '../helpers/userId'


class ManageActivity extends Component {
  constructor(props) {
    super(props)
    this.state = {
        activities: [],
    }
  }

  getActivity(){
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    axios.get(`${BASE_URL}/api/v1/users/${userId}`, config)
    .then(response => {
      console.log("activities retrieved." + response.data.activities)
      this.setState({activities: response.data.activities})
    })
    .catch(error => {
      console.log("Error!!!")
      console.log(error)
    })
  }


  componentDidMount() {
    this.getActivity()
  }


  render(){
    const {activities} = this.state    
    return (
        <div>
        <h5>Manage your module commitments!</h5>
        <h6>Do yo feel your module actually require less or more than the <strong>recommended 10 hours</strong>?</h6>
        <br/>
        <h6>Edit the expected module commitment hours to keep track of the time you realistically need for the module.</h6>
        <br/>
        <h6>Delete the module you may have droped. Delete the activity will delete <strong>all</strong> related events/deadlines.</h6>
        <br/> <br/>
          <div>
            {activities.map(activity=>
              <SingleActivity key={activity.id} activity={activity}/>
            )}
          </div>
        </div>
    );
  }  
}


export default ManageActivity;

