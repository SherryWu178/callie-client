import React, {useState} from 'react';
import {Form, Button, InputGroup} from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from './constants'
import { token } from '../helpers/token'
import { userId } from '../helpers/userId'
import { history } from '../helpers/history'
import bsCustomFileInput from 'bs-custom-file-input'


export default class UploadICSForm extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        file:{}
      }
    }

    componentDidMount() {
      bsCustomFileInput.init()
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
        this.readEvents()
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
        const data = {
          'user_id': userId
        }

        axios.post(`${BASE_URL}/api/v1/events/read`, data, config)
        .then(response => {
          console.log("Reading Event!!!")
          this.importEvents()
        })
        .catch(error => console.log(error))
      }
    
    
    importEvents= () => {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const data = {
          user_id: userId
        }
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
      this.saveIcsFile()
    }

    changeFile = (e) => {
      this.setState({
        file: e.target.files[0]
      })
    } 

    render(){
        return(
            <div>
            <h5>Upload an .ics file to sync you local calendar</h5>
            <div>
                <Form>
                    <Form.File 
                        id="custom-file"
                        label="Upload an .ics file"
                        onChange={this.changeFile}
                        class="custom-file-input"
                        custom
                    />
                    {console.log(this.state.file)}
                    <Form.Text className="text-muted">
                        You can download .ics files from Google Calendar and NUSMods
                    </Form.Text>
                    </Form>
            </div>
            <Button size="sm" variant="primary" type="submit" onClick={this.handleSubmit}>
                        Submit
            </Button>
            </div>
        )
    }
    
}

