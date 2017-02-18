import React from 'react';
import Relay from 'react-relay';
import classnames from 'classnames';

class Issue extends React.Component {
  handleCompleteChange = (e) => {
  };

  handleDestroyClick = () => {
  };

  removeIssue() {
  }

  render() {
    return (
      <li
        className={classnames({
          completed: this.props.Issue.complete,
        })}
      >
        <div className="view">
          <input
            checked={this.props.Issue.complete}
            className="toggle"
            onChange={this.handleCompleteChange}
            type="checkbox"
          />
          <label>{this.props.Issue.text}</label>
          <button
            className="destroy"
            onClick={this.handleDestroyClick}
          />
        </div>
      </li>
    );
  }
}

export default Relay.createContainer(Issue, {
  fragments: {
    Issue: () => Relay.QL`
      fragment on Issue {
        IssueId,
        IssueName,
        IssueDescription,
      }
    `
  },
});
