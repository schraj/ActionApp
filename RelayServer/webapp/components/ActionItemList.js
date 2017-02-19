import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router'

import Issue from './Issue';
import ActionItem from './ActionItem';
import Official from './Official';

class ActionItemList extends React.Component {
  renderActionItems(issue) {
    const actionItems = issue.node.ActionItems;
    return actionItems.edges.map(edge =>
      <ActionItem
        issueId={issue.node.IssueId}
        actionItem={edge.node}
        viewer={this.props.viewer}
      />,
    );
  }
  render() {
    const viewer = this.props.viewer;
    const issueId = this.props.params.issueId;
    const issue = viewer.Channels.edges[0].node.Issues.edges.find(i => i.node.IssueId == issueId);
    
    return (
      <section className="main">
        <header className="header">
          <h1>
            Issue: {issue.node.IssueName}  
            <br/>             
            <br/>             
            Action Items:
          </h1>
        </header>
        <ul className="issue-list">
          {this.renderActionItems(issue)}
        </ul>
        <Link to={`/`}>Back To Issues</Link>
      </section>
    );
  }
}

export default Relay.createContainer(ActionItemList, {
    fragments: {
     viewer: () => Relay.QL`
      fragment on AppUser {
          Channels(first:1){
            edges {
              node {
                Issues(first:100) {
                  edges {
                    node{
                      id
                      IssueId
                      IssueName
                      IssueDescription   
                      ActionItems(first:100){
                        edges{
                          node{
                            ${ActionItem.getFragment('actionItem')}
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
