import React, {useState} from 'react';
import {Form, Button, InputGroup} from 'react-bootstrap';
import NavBar from './NavBar';
import UploadICSForm from './UploadICSForm'
import WebScrapForm from './WebScrapForm'
import ManageActivity from './ManageActivity'
import '../styles/Settings.css';
import '../styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Setting extends React.Component {

  constructor(props){
    super(props)
  }

    render(){
        return(
          <React.Fragment>
            <div>
              <NavBar currentUser = {JSON.parse(localStorage.getItem('user'))}/>
            </div>
            <div className="Settings-body" >
              <h3>Settings</h3>
              <div className="divider"/>
              <div className="Settings-body">
                <WebScrapForm/>
              </div>
              <div className="divider"/>
              <div className="Settings-body">
                <UploadICSForm/>
              </div>
              <div className="divider"/>
              <div className="Settings-body">
                <ManageActivity/>
              </div>
            </div>
          </React.Fragment>
        )
    }
    
}

