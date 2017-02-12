import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import Reindex from './Reindex';

import App from './areas/App';

Relay.injectNetworkLayer(Reindex.getRelayNetworkLayer());

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
