import React, {Component, setState} from 'react';
import axios from 'axios';
import {Form, Button, InputGroup, FormControl, Col} from 'react-bootstrap';
import { BASE_URL } from './constants';
import { token } from '../helpers/token'
import { userId } from '../helpers/userId'



class SingleActivity extends Component {
  constructor(props) {
    super(props)
    this.state = {
        readOnly: true,
        newTitle: this.props.activity.title,
        newTarget: 10,
    }
  }

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState(
      {[name]: value}
    )
  }

  deleteActivity = () => {
    const config = {
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        },
        
        data: { id: this.props.activity.id }
    };
    axios.delete(`${BASE_URL}/api/v1/events/${this.props.currentEvent.id}`, config)
  }

  updateActivity = () => {
    const id = this.props.activity.id
    const config = {
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        }
    };
    axios.patch(`${BASE_URL}/api/v1/activities/${id}`,
        {
            title: this.state.newTitle,
            target: this.state.newTarget,
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

  switchToEdit = (e) => {
    this.setState({
      readOnly: false
    })
    e.preventDefault()
  }


  render(){
    const {activity} = this.props
    const {readOnly, newTitle, newTarget} = this.state    
    return (
        <div >
            <Form>
            <Form.Row>
              <Col md="1">
                <Form.Control
                  readOnly = {readOnly}
                  className="mb-2 mr-sm-2"
                  placeholder={activity.title}
                  size = "sm"
                  name = "newTitle"
                  value = {newTitle}
                  onChange = {this.handleChange}
                />
              </Col>
              <Col md="1">
                <InputGroup className="mb-2 mr-sm-2">
                  <FormControl 
                    readOnly = {readOnly}
                    placeholder={activity.target}
                    size = "sm"
                    name = "newTarget"
                    value = {newTarget}
                    onChange = {this.handleChange}/>
                </InputGroup>
              </Col>
              {console.log(readOnly)}
              {readOnly
              ?<Button size = "sm" variant="secondary" className="mb-2 mr-sm-1"
              onClick={this.switchToEdit}>Edit</Button>
              :<Button size = "sm" variant="secondary" className="mb-2 mr-sm-1"
              onClick={this.updateActivity}>Save</Button>}

              <Button size = "sm" variant="secondary" className="mb-2 mr-sm-2"
              onClick={this.deleteActivity}>Delete</Button> 
            </Form.Row>
          </Form>
        </div>
    );
  }  
}


export default SingleActivity;

