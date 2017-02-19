import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';

import ActionApp from '../components/ActionApp';
import IssueList from '../components/IssueList';
import ActionItemList from '../components/ActionItemList';
import ViewerQueries from './ViewerQueries';

export default (
  <Route
    path="/"
    component={ActionApp}
    queries={ViewerQueries}
  >
    <IndexRoute
      component={IssueList}
      queries={ViewerQueries}
    />
    <Route path=":actionItems" component={ActionItemList} queries={ViewerQueries}>
      <Route path="/actionItems/:issueId"/>
    </Route>
  </Route>
);
