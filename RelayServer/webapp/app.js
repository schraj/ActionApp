import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { RootContainer } from 'react-relay';
import ActionApp from './components/ActionApp';
import AppHomeRoute from './routes/AppHomeRoute';

render(
  <RootContainer
    Component={ActionApp}
    route={new AppHomeRoute()}
  />,
  document.getElementById('root'),
);
