import React, {useState} from 'react';
import {Form, Button,Col} from 'react-bootstrap';
import DatetimeRangePicker from 'react-datetime-range-picker';
import Axios from 'axios';
import moment from 'moment'

const WebScrapForm = () => {
    return(
        <div>
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
                    <Form.Control placeholder="CS1101" />
                </Form.Group>
            </Form>
        </div>

        <div>
            <h3>Step 2: Upload an .ics file to sync you local calendar</h3>
            <br/>
            <Form>
                <Form.File 
                    id="custom-file"
                    label="Upload an .ics file"
                    custom
                />
                <Form.Text className="text-muted">
                    You can download .ics files from Google Calendar and NUSMods
                </Form.Text>
                </Form>
        </div>
        <br/>
        <Button variant="primary" type="submit">
                    Submit
        </Button>

        </div>
    )
}



export default WebScrapForm