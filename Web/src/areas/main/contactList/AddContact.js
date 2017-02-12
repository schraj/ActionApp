import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay';
import ReactDOM from 'react-dom'
import { FormControl, FormGroup, ControlLabel, Button, Checkbox } from 'react-bootstrap'
import './AddContact.css'

export default class AddContact extends Component {
  static propTypes = {
    onAddContact: PropTypes.func.isRequired
  }
  
  handleSubmit = (e) => {
      e.preventDefault()
      let firstNameNode = ReactDOM.findDOMNode(this.refs.firstName)
      let lastNameNode = ReactDOM.findDOMNode(this.refs.lastName)
      let locationNode = ReactDOM.findDOMNode(this.refs.location)
      let latitudeNode = ReactDOM.findDOMNode(this.refs.latitude)
      let longitudeNode = ReactDOM.findDOMNode(this.refs.longitude)
      let isFriendNode = ReactDOM.findDOMNode(this.refs.isFriend)
      this.props.onAddContact(firstNameNode.value,lastNameNode.value,locationNode.value,latitudeNode.value,longitudeNode.value,isFriendNode.value)
      firstNameNode.value = "";
      lastNameNode.value = "";
      locationNode.value = "";
      latitudeNode.value = "";
      longitudeNode.value = "";
      isFriendNode.value = "";
  }

render() {
    return (
      <div className="contact-form">
        <form onSubmit={this.handleSubmit} >
          <FormGroup role="form" controlId="txtFirstName">
            <ControlLabel>First Name: </ControlLabel>
            <FormControl type="text" 
              ref="firstName"
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup role="form" controlId="txtLastName">
            <ControlLabel>Last Name: </ControlLabel>
            <FormControl type="text" 
              ref="lastName"
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup role="form" controlId="txtLocation">
            <ControlLabel>Location: </ControlLabel>
            <FormControl type="text" 
              ref="location"
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup role="form" controlId="txtLatitude">
            <ControlLabel>Latitude: </ControlLabel>
            <FormControl type="text" 
              ref="latitude"
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup role="form" controlId="txtLongitude">
            <ControlLabel>Longitude: </ControlLabel>
            <FormControl type="text" 
              ref="longitude"
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup role="form" controlId="txtIsFriend">
            <ControlLabel>Is Friend: </ControlLabel>
            <FormControl type="Checkbox" 
              ref="isFriend"
            />
            <FormControl.Feedback />
          </FormGroup>
          <Button className="btn btn-primary btn-large centerButton" type="submit">Add Contact</Button>
        </form>
      </div>
    )
  }
}