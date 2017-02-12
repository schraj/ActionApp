import React, {Component} from 'react';
import Relay from 'react-relay';

import Reindex from '../Reindex';
import Main from './main/Main';
import AppRoute from '../routes/AppRoute';
//import './importContacts';

export default class App extends Component {
  render() {
    return (
      <Relay.RootContainer
        Component={Main}
        route={new AppRoute}
        forceFetch={true} />
    );
  }
}