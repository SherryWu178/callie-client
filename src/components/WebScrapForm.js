import React, {useState} from 'react';
import {Form, Button,Col} from 'react-bootstrap';
import DatetimeRangePicker from 'react-datetime-range-picker';
import Axios from 'axios';
import moment from 'moment'

const WebScrapForm = () => {
    return(
        <div>
            <h3>Step 1: Enter details to retrieve deadline information</h3>
            <br/>
            <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Website</Form.Label>
                    <Form.Control as="select" placeholder="Select website">
                        <option>Coursemology</option>
                        <option>LumiNUS</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Module Code</Form.Label>
                    <Form.Control type="password" placeholder="" />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Next
                </Button>
            </Form>
        </div>
    )
}



export default WebScrapForm