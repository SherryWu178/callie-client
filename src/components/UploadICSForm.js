import React, {useState} from 'react';
import {Form, Button,Col} from 'react-bootstrap';
import DatetimeRangePicker from 'react-datetime-range-picker';
import Axios from 'axios';
import moment from 'moment'

const UploadICSForm = () => {
    return(
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
                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Form>
        </div>
    )
}



export default UploadICSForm