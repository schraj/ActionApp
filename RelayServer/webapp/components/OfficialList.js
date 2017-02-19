import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router'

import Issue from './Issue';
import Official from './Official';
import ActionItem from './ActionItem';

class OfficialList extends React.Component {
  renderOfficials(actionItem) {
    const officials = actionItem.node.Officials;
    return officials.edges.map(edge =>
      <Official
        official={edge.node}
        viewer={this.props.viewer}
      />,
    );
  }
  render() {
    const viewer = this.props.viewer;
    const issueId = this.props.params.issueid;
    const actionItemId = this.props.params.actionitemid;
    
    const issue = viewer.Channels.edges[0].node.Issues.edges.find(i => i.node.IssueId == issueId);
    const actionItem = issue.node.ActionItems.edges.find(i => i.node.ActionItemId == actionItemId);

    return (
      <section className="main">
        <header className="header">
          <h1>
            Action Item: {actionItem.node.ActionItemName}  
            <br/>             
            <br/>             
            Officials:
          </h1>
        </header>
        <ul className="issue-list">
          {this.renderOfficials(actionItem)}
        </ul>
        <Link to={`/issue/${issueId}/`}>Back To Actions</Link>
      </section>
    );
  }
}

export default Relay.createContainer(OfficialList, {
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
                            id
                            IssueId
                            IssueName
                            IssueDescription   
                            ActionItems(first:1000){
                              edges{
                                node{
                                  ActionItemId
                                  ActionItemName
                                  ActionItemDescription 
                                  Officials(first:1000){
                                    edges{
                                      node{
                                        ${Official.getFragment('official')}
                                      }
                                    }
                                  }                                  
                                }
                              }
                            }
                          }
                        }
                      }        
                    }
                  }  
                }
            },
          `
  },  
});
