import React, {useState} from 'react';
import {Form, Button, InputGroup} from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from './constants'
import { token } from '../helpers/token'
import { userId } from '../helpers/userId'
import { history } from '../helpers/history'
import NavBar from './NavBar';


export default class SetUp extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      url: 'https://coursemology.org/users/sign_in',
      email: '',
      password:'',
      mod:'',
      file:{}
  }
  }
    handleChange = (e) => {
      const {name, value} = e.target
      this.setState(
        {[name]: value}
      )
    }

    webscrapDeadline = () => {
        const data = {
          url: this.state.url,
          email: this.state.email,
          password:this.state.password,
          mod: this.state.mod
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        axios.post(`${BASE_URL}/api/v1/deadlines/webscrap`, data, config)
        .then(response => {
          console.log(response)
          console.log("Webscrap Deadlines!!!")
        })
        .catch(error => {
          console.log("Error!!!")
          console.log(error)
        })
      }
    
    importDeadlines = () => {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
    
        axios.get(`${BASE_URL}/api/v1/deadlines/import`, config)
        .then(response => {
          console.log("Importing Deadlines!!!")
        })
        .catch(error => {
          console.log("Error!!!")
          console.log(error)
        })
      }
    
    saveIcsFile = () => {
      const data = new FormData()
      data.append('file', this.state.file)
      console.log(this.state.file)
      const config = {
        headers: { 'Authorization': `Bearer ${token}`}
      };
      axios.post(`${BASE_URL}/api/v1/events/write`, data, config)
      .then(response => {
        console.log(data)
        console.log("Write ics file")
      })
      .catch(error => {
        console.log("Error!!!")
        console.log(error)
      })
    }
      
    readEvents = () => {
        const config = {
          headers: { 
          'Authorization': `Bearer ${token}`}
        };
    
        axios.get(`${BASE_URL}/api/v1/events/read`, config)
        .then(response => {
          console.log("Reading Event!!!")
        })
        .catch(error => console.log(error))
      }
    
    
    importEvents= () => {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
    
        axios.get(`${BASE_URL}/api/v1/events/import`, config)
        .then(response => {
          console.log("Importing Events!!!")
        })
        .catch(error => {
          console.log("Error!!!")
          console.log(error)
        })
      }

    handleSubmit = () => {
      //this.webscrapDeadline()
      this.saveIcsFile()
      this.readEvents()
      this.importEvents()
      history.push('/');
      window.location.reload(false);
    }

    changeFile = (e) => {
      this.setState({
        file: e.target.files[0]
      })
    } 

    render(){
      const {url, email, password, mod, file} = this.state
        return(
          <React.Fragment>
            <div>
            <NavBar currentUser = {JSON.parse(localStorage.getItem('user'))}/>
            </div>
            <div>
            <div>
                <h5>Step 1: Enter details to retrieve deadline information</h5>
                <br/>
                <Form>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Website</Form.Label>
                        <Form.Control name="url" as="select" placeholder="Select website"　onChange={this.handleChange}>
                            <option key={1} value="https://coursemology.org/users/sign_in">Coursemology</option>
                            <option key={2} value="https://luminus.nus.edu.sg/">LumiNUS</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.handleChange}/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Module Code</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text>CS</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control placeholder="1101" name="mod" onChange={this.handleChange}/>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </div>
    
            <div>
                <h5>Step 2: Upload an .ics file to sync you local calendar</h5>
                <br/>
                <Form>
                    <Form.File 
                        id="custom-file"
                        label="Upload an .ics file"
                        onChange={this.changeFile}
                        custom
                    />
                    {console.log(this.state.file)}
                    <Form.Text className="text-muted">
                        You can download .ics files from Google Calendar and NUSMods
                    </Form.Text>
                    </Form>
            </div>
            <br/>
            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Submit
            </Button>
            </div>
          </React.Fragment>
        )
    }
    
}

