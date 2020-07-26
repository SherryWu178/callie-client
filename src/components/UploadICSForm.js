import React from 'react';
import {Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from './constants'
import { token } from '../helpers/token'
import { userId } from '../helpers/userId'
import bsCustomFileInput from 'bs-custom-file-input'


export default class UploadICSForm extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        file:{},
        error:{},
        success:{},
        loading:false
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
        console.log("Write ics file")
      })
      .catch(error => {
        console.log(this.state.file)
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
        .catch(error => {
          console.log(error)})
          // this.setState({error:2})
      }
    
    
    importEvents= () => {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        axios.get(`${BASE_URL}/api/v1/events/import`, config)
        .then(response => {
          console.log("Importing Events!!!")
          this.setState({loading: false})
          this.setState({success:1})
          window.location.reload();
        })
        .catch(error => {
          console.log("Error!!!")
          console.log(error)
          // this.setState({error:2})
        })
      }

    handleSubmit = () => {
      this.saveIcsFile()
      this.setState({loading: true})
    }

    changeFile = (e) => {
      this.setState({
          success:{},
          error:{},
        file: e.target.files[0]
      })
      
      if (e.target.files[0]){
        if (!e.target.files[0].name.endsWith(".ics")) {
          this.setState({
            error:2
          })
        }
      }
    } 

    render(){
        return(
            <div>
            <h5>Upload your calendar <strong>(.ics)</strong> file from NusMods.com</h5>
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

            {this.state.loading === true && 
              <Form.Text 
              className="text" 
              style={{color: "green"}}>processing data...</Form.Text>} 

            {this.state.error === 1 && 
              <Form.Text style={{color: "red"}}>Please upload a file.</Form.Text>}
            
            {this.state.error === 2 && 
              <Form.Text 
              className="text" 
              text-color = "red"
              style={{color: "red"}}>The file format is not supported. Please check again.</Form.Text>}
            
            {this.state.success === 1 && 
              <Form.Text 
              className="text" 
              style={{color: "green"}}>Successfully uploaded!</Form.Text>} 
            </div>
        )
    }
    
}

