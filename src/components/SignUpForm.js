import React, { useState } from "react";
import {Form, Button, FormGroup, FormControl} from "react-bootstrap";
import axios from 'axios'
import "../styles/LogInForm.css";
import { history } from '../helpers/history'
import { Link} from 'react-router-dom'
import { BASE_URL } from './constants'
import NavBar from './NavBar';


export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState({})


  const checkPassword = (inputtxt) => {
    var passw= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,30}$/;
    if(passw.test(inputtxt)) 
    { 
    return true;
    }
    else
    { 
    return false;
  }

  }

  const signup = () =>  {
    var creds = {
      user: {
        username: username,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      }
    }

    axios.post(`${BASE_URL}/api/v1/users`, creds)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data.user))
        localStorage.setItem('user_id', JSON.stringify(res.data.user.id))
        localStorage.setItem('token', JSON.stringify(res.data.token))
        history.push('/setup'); 
        window.location.reload(false);
      })
      .catch(err => {
        if (!username||!email||!password||!passwordConfirmation){
          setError(1)
        } else {
          console.log(password)
          console.log(checkPassword(password))
          if (checkPassword(password)){
            setError(2)
          } else {
            setError(3)
          }
        }
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    signup();
  }

  return (
    <React.Fragment>
      <div>
      <NavBar currentUser = {JSON.parse(localStorage.getItem('user'))}/>
      </div>
    <div className="Login">
      <Form onSubmit={handleSubmit}>
      <FormGroup  bsSize="large">
            <Form.Label>Username</Form.Label>
          <FormControl
            autoFocus
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
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
          <Form.Text className="text-muted">
          The password must contain a minimum of 1 lower case letter, 1 upper case letter, 1 numeric character [0-9] and 1 special character and must have a length longer than 6 characters.    
          </Form.Text>
        </FormGroup>
        <FormGroup controlId="password_confirmation" bsSize="large">
          <Form.Label>Enter Password Again</Form.Label>
          <FormControl
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" type="submit">
          Sign up for new account
        </Button>
        <Button block href="/" bsSize="large">
          Back to home
        </Button>
        <FormGroup >
          Already have an account? Click <Link to="/login"> here </Link>to log in
        </FormGroup>
        {error === 1 && 
              <Form.Text style={{color: "red"}}>Please fill in all fields.</Form.Text>}
            
        {error === 2 && 
              <Form.Text 
              style={{color: "red"}}>This username/email is already taken. Please try again.</Form.Text>}

        {error === 3 && 
              <Form.Text 
              style={{color: "red"}}>Your password does not meet the requirement. Please try again.</Form.Text>}
      </Form>
    </div>
    </React.Fragment>
  );
}