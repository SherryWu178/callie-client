import React, { useState } from "react";
import {Form, Button, FormGroup, FormControl} from "react-bootstrap";
import axios from 'axios'
import { history } from '../helpers/history'
import "../styles/LogInForm.css";
import { Link, BrowserRouter as Router } from 'react-router-dom'
import { BASE_URL } from './constants'
import NavBar from './NavBar';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({})


  const handleSubmit = (event) => {
    event.preventDefault();
    login(email,password);
  }

    
  const login = (email, password) => {
    const creds = {
      authentication: {
          email: email,
          password: password        
      }
    }
    axios.post(`${BASE_URL}/auth/login`, creds, {
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log("Logged in  success!!" + JSON.stringify(res.data.token));
      localStorage.setItem('user', JSON.stringify(res.data.user))
      localStorage.setItem('user_id', JSON.stringify(res.data.user.id))
      localStorage.setItem('token', JSON.stringify(res.data.token))
      history.push('/');
      window.location.reload(false);
    })
    .catch(err => {
      console.log(err)
      if (!email||!password){
        setError(1)
      } else {
        setError(2)
      }
    });

  };
  
  return (
    <React.Fragment>
      <div>
      <NavBar currentUser = {JSON.parse(localStorage.getItem('user'))}/>
      </div>
      <div className="Login">
        <Form onSubmit={handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
              <Form.Label>Email</Form.Label>
            <FormControl
              autoFocus
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <Form.Label>Password</Form.Label>
            <FormControl
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </FormGroup>
          <Button block bsSize="large" type="submit">
            Login
          </Button >
          <Button block href="/" bsSize="large">
          Back to home
          </Button>
          <FormGroup >
            First time using NusCallie? Click <Link to="/signup"> here </Link>to sign up
          </FormGroup>
          {error === 1 && 
              <Form.Text style={{color: "red"}}>Please fill in all fields.</Form.Text>}
          {error === 2 && 
              <Form.Text 
              className="text" 
              text-color = "red"
              style={{color: "red"}}>Your login credentials could not be verified, please try again.</Form.Text>}
        </Form>
      </div>
    </React.Fragment>
  );
}