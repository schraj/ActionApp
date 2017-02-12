import React from 'react';
import Relay from 'react-relay';
import AddContact from './contactList/AddContact'
import ContactList from './contactList/ContactList'
import ContactStatus from './contactStatus/ContactStatus'

import AddContactMutation from '../../mutations/AddContactMutation';
import DeleteContactMutation from '../../mutations/DeleteContactMutation';

import './Main.css'

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  addContact = (firstName, lastName, location, latitude, longitude, isFriend) => {
    Relay.Store.commitUpdate(
      new AddContactMutation({
        firstName,
        lastName,
        location,
        latitude,
        longitude,
        isFriend,
        viewer: this.props.viewer,
      }),
    );
  }

  render() {
    return (
      <div className="main-scene-layout">
        <AddContact onAddContact={this.addContact} />
        <ContactList contacts={this.props.viewer.allContacts}
                      viewer={this.props.viewer} />
        <ContactStatus contactCount={this.props.viewer.allContacts.count}/>
      </div>
    );
  }
}

export default Relay.createContainer(Main, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on ReindexViewer {
        allContacts(first: 1000000) {
          count,
          edges {
            node {
              id,
            }
          }
          ${ContactList.getFragment('contacts')}
        },
        ${ContactList.getFragment('viewer')}
        ${AddContactMutation.getFragment('viewer')}
        ${DeleteContactMutation.getFragment('viewer')}
      }
    `
  },
});