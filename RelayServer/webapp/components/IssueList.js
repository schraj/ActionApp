import React from 'react';
import Relay from 'react-relay';

import Issue from './Issue';

class IssueList extends React.Component {
  renderIssues() {
    return this.props.issues.edges.map(edge =>
      <Issue
        key={edge.node.id}
        Issue={edge.node}
        //viewer={this.props.viewer}
      />,
    );
  }

  render() {
    return (
      <section className="main">
        <ul className="issue-list">
          {this.renderIssues()}
        </ul>
      </section>
    );
  }
}

export default Relay.createContainer(IssueList, {
  fragments: {
    Issues: () => Relay.QL`
      fragment on Issue {
        IssueId,
        IssueName,
        IssueDescription,
      }
    `
  },
});
