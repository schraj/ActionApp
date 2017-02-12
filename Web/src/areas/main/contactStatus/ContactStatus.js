import React, { PropTypes } from 'react'
import Relay from 'react-relay';
import './ContactStatus.css'

export default class ContactStatus extends React.Component {
  render() {
    var statusMessage = "nice!";

    return (
      <div>
        <div className="contact-status-widget">
          <div className="contact-count">{this.props.contactCount}</div>
          <div className="contact-status-message">{statusMessage}</div>    
        </div>
      </div>
    );
  }
}

ContactStatus.propTypes = {
    contactCount: PropTypes.number.isRequired
}