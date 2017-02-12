import React, { PropTypes } from 'react'
import Relay from 'react-relay';
import Contact from './Contact'
import './ContactList.css'

import DeleteContactMutation from '../../../mutations/DeleteContactMutation';

class ContactList extends React.Component {
  constructor(props) {
    super(props);
  }

  onEditContact = (id) => {
    throw new Error("not implemented");
  }

  onDeleteContact = (id) => {
    Relay.Store.commitUpdate(
        new DeleteContactMutation({
          id: id,
          viewer: this.props.viewer,
        })
    );    
  }

  render() {

    return (  
    <ul className="contact-list">
      {this.props.contacts.edges.map(edge =>
        <Contact
          key={edge.node.id}
          contact = {edge.node}
          onEditClick={this.onEditContact}
          onDeleteClick={this.onDeleteContact}
        />
      )}
    </ul>
    );
  }
}

export default Relay.createContainer(ContactList, {
  fragments: {
    contacts: () => Relay.QL`
      fragment on _ContactConnection {
        count,
        edges {
          node {
            id,
            lastName,
            firstName,
            location,
            latitude,
            longitude,
            isFriend,
            ${Contact.getFragment('contact')}
          }
        }
      }
    `,
    viewer: () => Relay.QL`
      fragment on ReindexViewer {
        ${DeleteContactMutation.getFragment('viewer')}
      }
    `
  },
});

