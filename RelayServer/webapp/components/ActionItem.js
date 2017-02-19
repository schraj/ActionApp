import React from 'react';
import Relay from 'react-relay';
import classnames from 'classnames';
import { Router, Route, Link, browserHistory } from 'react-router'

class ActionItem extends React.Component {
  handleCompleteChange = (e) => {
  };

  skipActionItem() {
  }

  render() {
    const actionItem = this.props.actionItem;

    return (
      <li key={actionItem.id}>
        <div className="view">
          <label>{actionItem.ActionItemName}</label>
          <br/>
          <label>{actionItem.ActionItemDescription}</label>
        </div>
      </li>
    );
  }
}

export default Relay.createContainer(ActionItem, {
  fragments: {
    actionItem: () => Relay.QL`
      fragment on ActionItem {
          ActionItemId,
          ActionItemName,
          ActionItemDescription        
      }
    `
  },
});
