import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import Relay from 'react-relay';
import './Contact.css'

class Contact extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (  
      <div>
        <li className="contact-item"
          onClick={this.onEditClick}
        >
          <span className="contact-info-string">{this.props.contact.firstName} {' '} { this.props.contact.lastName } {'  from '} { this.props.contact.location }</span>
          <Button className="delete-button" bsStyle="danger" onClick={() => this.props.onDeleteClick(this.props.contact.id)}>X</Button>
        </li>
    </div>
    );
  }
}

export default Relay.createContainer(Contact, {
  fragments: {
    contact: () => Relay.QL`
      fragment on Contact {
        id,
        lastName,
        firstName,
        location,
        latitude,
        longitude,
        isFriend
      }
    `
  }
});

