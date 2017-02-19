import React from 'react';
import Relay from 'react-relay';
import classnames from 'classnames';
import { Router, Route, Link, browserHistory } from 'react-router'

import Official from './Official';

class ActionItem extends React.Component {

  render() {    
    const { actionItem, issueId } = this.props;

    return (
      <li key={actionItem.id}>
        <div className="view">
          <Link to={`/actionitem/${issueId}/${actionItem.ActionItemId}`}>{actionItem.ActionItemName}</Link>
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
    `
  },
});
