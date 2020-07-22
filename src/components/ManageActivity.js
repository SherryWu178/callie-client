import React, {Component, setState} from 'react';
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
        <h5>Manage your activities</h5>
          <div>
            {activities.map(activity=>
              <SingleActivity activity={activity}/>
            )}
          </div>
        </div>
    );
  }  
}


export default ManageActivity;

