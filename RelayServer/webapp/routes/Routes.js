import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';

import ActionApp from '../components/ActionApp';
import IssueList from '../components/IssueList';
import ActionItemList from '../components/ActionItemList';
import OfficialList from '../components/OfficialList';
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
    <Route path=":issue" component={ActionItemList} queries={ViewerQueries}>
      <Route path="/issue/:issueId"/>
    </Route>
    <Route path=":actionitem" component={OfficialList} queries={ViewerQueries}>
      <Route path="/actionitem/:issueid/:actionitemid"/>
    </Route>
  </Route>
);
