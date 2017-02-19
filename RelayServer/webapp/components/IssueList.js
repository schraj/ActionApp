import React from 'react';
import Relay from 'react-relay';

import Issue from './Issue';

class IssueList extends React.Component {
  renderIssue() {
    const { viewer } = this.props;
    const issues = viewer.Channels.edges[0].node.Issues;
    return issues.edges.map(edge =>
      <Issue
        key={edge.node.id}
        issue={edge.node}
        viewer={this.props.viewer}
      />,
    );
  }

  render() {
    return (
      <section className="main">
        <ul className="issue-list">
          {this.renderIssue()}
        </ul>
      </section>
    );    
  }
}

export default Relay.createContainer(IssueList, {
    fragments: {
        viewer: () => Relay.QL`
      fragment on AppUser {
        FirstName
        LastName        
          Channels(first:1){
            edges {
              node {
                id
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
    //  issues: () => Relay.QL`
    //   fragment on IssueConnection {
    //     edges {
    //       node{
    //           ${Issue.getFragment('issue')}
    //         }
    //     }     
    //   },
    //`
  },  
});
