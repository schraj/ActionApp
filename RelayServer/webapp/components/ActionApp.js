import React from 'react';
import Relay from 'react-relay';

//import SubmitIssueMutation from '../mutations/SubmitIssueMutation';
import IssueList from './IssueList';
import Issue from './Issue';
import ActionItemList from './ActionItemList';
import ActionItem from './ActionItem';
import Official from './Official';

class ActionApp extends React.Component {
  render() {
    const { viewer, children } = this.props;

    return (
      <div data-framework="relay">
        <section className="issue-app">
          <header className="header">
            <h1>
              Democracy Channel
            </h1>
          </header>

         {children}
        </section>
        <footer className="info">
           <small>OneGoodThing<sub>tm</sub></small>
        </footer>
      </div>
    );
  }
}

export default Relay.createContainer(ActionApp, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on AppUser {
        FirstName
        LastName        
          Channels(first:1){
            edges {
              node {
                ChannelId
                ChannelName
                Issues(first:100) {
                  edges {
                    node{
                      ${Issue.getFragment('issue')}
                     }
                  }
                }        
              }
            }  
          }
      },
    `
  }  
});
