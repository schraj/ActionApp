import React from 'react';
import Relay from 'react-relay';

//import SubmitIssueMutation from '../mutations/SubmitIssueMutation';
import IssueList from './IssueList';
//import IssueListFooter from './IssueListFooter';

class IssueApp extends React.Component {
  handleTextInputSave = (text) => {
    // this.props.relay.commitUpdate(
    //   new AddIssueMutation({ text, viewer: this.props.viewer })
    // );
  };

  render() {
    const hasIssues = this.props.viewer.totalCount > 0;
    return (
      <div>
        <section className="issue-app">
          <header className="header">
            <h1>
              Issues
            </h1>
            {/*<IssueTextInput
              autoFocus
              className="new-issue"
              onSave={this.handleTextInputSave}
              placeholder="What needs to be done?"
            />*/}
          </header>

          <IssueList viewer={this.props.viewer} />

          {/*{hasIssues &&
            <IssueListFooter
              Issues={this.props.viewer.Issues}
              viewer={this.props.viewer}
            />
          }*/}
        </section>
        <footer className="info">
          <p>
              footer
          </p>
        </footer>
      </div>
    );
  }
}

export default Relay.createContainer(IssueApp, {
 fragments: {
    viewer: () => Relay.QL`
      fragment on AppUser {
        FirstName,
        LastName
      }
    `,
    Issues: () => Relay.QL`
      fragment on Issue {
        IssueId,
        IssueName,
        IssueDescription,
      }
    `
  },

});
