import React from 'react';
import Relay from 'react-relay';
import classnames from 'classnames';
import { Router, Route, Link, browserHistory } from 'react-router'

class Official extends React.Component {
  render() {
    const official = this.props.official;

    return (
      <li key={official.id}>
        <div className="view">
          <bold>{official.FirstName} {official.LastName}({official.Party}) - {official.GeographyId} {official.Phone}</bold>
          <br/>
          <a href="{official.ContactForm}">Send Message</a>
          <br/>
          <label>Twitter: {official.Twitter}</label>
          <br/>
          <label>Facebook: {official.Facebook}</label>
          <br/>
        </div>
      </li>
    );
  }
}

export default Relay.createContainer(Official, {
  fragments: {
    official: () => Relay.QL`
      fragment on Official {
          id
          OfficialId
          FirstName
          LastName
          GovernmentLevelId
          GeographyId
          Party
          Phone
          Email
          Url
          ContactForm
          Twitter
          Facebook        
      }
    `
  },
});
