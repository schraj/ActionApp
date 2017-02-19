import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import Relay from 'react-relay';
import ActionApp from './components/ActionApp';
import createHashHistory from 'history/lib/createHashHistory';

import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware';
import Router from 'react-router/lib/Router';
import useRouterHistory from 'react-router/lib/useRouterHistory';
import useRelay from 'react-router-relay';

import routes from './routes/Routes';
import schema from '../api/schema';

const history = useRouterHistory(createHashHistory)();

const mountNode = document.createElement('div');
document.body.appendChild(mountNode);

render(
  <Router
    history={history}
    routes={routes}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}
  />,
  mountNode
);
