import React, {Component} from 'react';
import axios from 'axios'
import { token } from '../helpers/token'


class Deadlines extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deadlines: [],
            events: []
        }
      }
    
    webscrapDeadlines() {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
        axios.get('/api/v1/deadlines/webscrap', config)
        .then(response => {
          console.log("Deadline Webscraping!!!")
        })
        .catch(error => console.log(error))
      }

    importDeadlines() {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
        axios.get('/api/v1/deadlines/import', config)
        .then(response => {
          console.log("Deadline importing!!!")
        })
        .catch(error => console.log(error))
      }

    
    componentDidMount() {
        //this.getEvents()
        this.webscrapDeadlines()
        this.importDeadlines()
      }
  

    render(){
        const {deadlines, events} = this.state 
        return(
            <div>
            <p>Event list</p> 
            </div>
        )
    }
    
}

export default Deadlines;