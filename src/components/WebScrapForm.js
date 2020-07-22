import React, {useState} from 'react';
import {Form, Button, InputGroup} from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from './constants'
import { token } from '../helpers/token'
import { userId } from '../helpers/userId'
import { history } from '../helpers/history'


export default class WebScrapForm extends React.Component {

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
        console.log(data)
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        axios.post(`${BASE_URL}/api/v1/deadlines/webscrap`, data, config)
        .then(response => {
          console.log(response)
          console.log("Webscrap Deadlines!!!")
          this.importDeadlines()
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
    
    

    handleSubmit = () => {
      this.webscrapDeadline()
    }

    changeFile = (e) => {
      this.setState({
        file: e.target.files[0]
      })
    } 

    render(){
      const {url, email, password, mod, file} = this.state
        return(
            <div>
            <div>
                <h5>Enter details to retrieve deadline information</h5>
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

            <Button size="sm" variant="primary" type="submit" onClick={this.handleSubmit}>
                        Submit
            </Button>
            </div>
        )
    }
    
}

