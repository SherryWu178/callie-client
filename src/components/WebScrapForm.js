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
      email: {},
      password:{},
      mod:{},
      error: {},
      success: {}
  }
  }
    handleChange = (e) => {
      const {name, value} = e.target
      this.setState(
        {[name]: value}
      )
    }

    webscrapDeadline = () => {
      const {url,email,password,mod} = this.state;
        const data = {
          url: url,
          email: email,
          password: password,
          mod: mod,
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
          if (!url||!email||!password||!mod){
            this.setState({error:1})
          } else {
            this.setState({error:2})
          }
        })
      }
    
    importDeadlines = () => {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
    
        axios.get(`${BASE_URL}/api/v1/deadlines/import`, config)
        .then(response => {
          console.log("Importing Deadlines!!!")
          this.setState({success:1})

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
        return(
            <div>
            <div>
                <h5>Coursemology account details</h5>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.handleChange}/>
                        <Form.Text className="text-muted">
                        The email used for Coursemology account with the selected module code below.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                        <Form.Text className="text-muted">
                        The password used for the same Coursemology account.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Module Code</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text>CS</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control placeholder="1010S" name="mod" onChange={this.handleChange}/>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </div>

            <Button size="sm" variant="primary" type="submit" onClick={this.handleSubmit}>
                        Submit
            </Button>

            {this.state.error === 1 && 
              <Form.Text className="text-muted">Please fill in all fields</Form.Text>}
            
            {this.state.error === 2 && 
              <Form.Text 
              className="text" 
              text-color = "red"
              style={{color: "red"}}>Your login credentials could not be verified, please try again.</Form.Text>}

            {this.state.success === 1 && 
              <Form.Text 
              className="text" 
              style={{color: "green"}}>deadlines successfully retrieved!</Form.Text>} 
            </div>
        )
    }
    
}

