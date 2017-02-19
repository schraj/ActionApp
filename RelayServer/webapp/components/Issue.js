import React from 'react';
import Relay from 'react-relay';
import classnames from 'classnames';
import { Router, Route, Link, browserHistory } from 'react-router'

class Issue extends React.Component {
  handleCompleteChange = (e) => {
  };

  skipIssue() {
  }

  render() {
    const issue = this.props.issue;
    return (
      <li key={issue.id}>
        <div className="view">
          <Link to={`/actionItems/${issue.IssueId}`}>{issue.IssueName}</Link>
          <br/>
          <label>{issue.IssueDescription}</label>
        </div>
      </li>
    );
  }
}

export default Relay.createContainer(Issue, {
  fragments: {
    issue: () => Relay.QL`
      fragment on Issue {
          id
          IssueId,
          IssueName,
          IssueDescription        
      }
    `
  },
});
