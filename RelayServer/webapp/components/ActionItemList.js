import React from 'react';
import Relay from 'react-relay';


import Issue from './Issue';
import ActionItem from './ActionItem';

class ActionItemList extends React.Component {
  renderActionItems(issue) {
    const actionItems = issue.node.ActionItems;
    return actionItems.edges.map(edge =>
      <ActionItem
        actionItem={edge.node}
        viewer={this.props.viewer}
      />,
    );
  }
  render() {
    const viewer = this.props.viewer;
    const issueId = this.props.params.issueId;
    console.log(issueId)
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
      </section>
    );
  }
}

export default Relay.createContainer(ActionItemList, {
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
                            IssueId
                            IssueName
                            IssueDescription
                            ActionItems(first:1000){
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
