import React from 'react';
import Relay from 'react-relay';

import Issue from './Issue';
import Official from './Official';

class OfficialList extends React.Component {
  renderOfficials(issue) {
    const officials = issue.node.officials;
    return officials.edges.map(edge =>
      <Official
        official={edge.node}
        viewer={this.props.viewer}
      />,
    );
  }
  render() {
    const viewer = this.props.viewer;
    const issueId = this.props.params.issueId;
    console.log(issueId)
    const actionItemId = this.props.params.actionItemId;
    console.log(actionItemId)
    const issue = viewer.Channels.edges[0].node.Issues.edges.find(i => i.node.IssueId == issueId);
    const actionItem = issue.node.actionItems.edges.find(i => i.node.ActionItemId == actionItemId);

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
                            ${Issue.getFragment('issue')}
                            ActionItems(first:1000){
                              edges{
                                node{
                                  ${ActionItem.getFragment('actionItem')}
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
