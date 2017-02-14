import path from 'path';
import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import { invert } from 'lodash';

import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} from './githubKeys';

import { setUpGitHubLogin } from './githubLogin';
import { GitHubConnector } from './github/connector';
import { Users } from './github/models';
import { PoliticalEvents } from './sql/models/politicalEvents';
import { Lookups } from './sql/models/lookups';
import { LookupItems } from './sql/models/lookupItems';
import { ActionItems } from './sql/models/actionItems';
import { Issues } from './sql/models/issues';
import { Officials } from './sql/models/officials';
import { Resources } from './sql/models/resources';

import { createServer } from 'http';

import schema from './schema';

import queryMap from '../extracted_queries.json';
import config from './config';

let PORT = 3010;
if (process.env.PORT) {
  PORT = parseInt(process.env.PORT, 10) + 100;
}

const WS_PORT = process.env.WS_PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const invertedMap = invert(queryMap);

app.use(
  '/graphql',
  (req, resp, next) => {
    if (config.persistedQueries) {
      // eslint-disable-next-line no-param-reassign
      req.body.query = invertedMap[req.body.id];
    }
    next();
  },
);

setUpGitHubLogin(app);

app.use('/graphql', graphqlExpress((req) => {
  // Get the query, the same way express-graphql does it
  // https://github.com/graphql/express-graphql/blob/3fa6e68582d6d933d37fa9e841da5d2aa39261cd/src/index.js#L257
  const query = req.query.query || req.body.query;
  if (query && query.length > 2000) {
    // None of our app's queries are this long
    // Probably indicates someone trying to send an overly expensive query
    throw new Error('Query too large.');
  }

  let user;
  if (req.user) {
    // We get req.user from passport-github with some pretty oddly named fields,
    // let's convert that to the fields in our schema, which match the GitHub
    // API field names.
    user = {
      login: req.user.username,
      html_url: req.user.profileUrl,
      avatar_url: req.user.photos[0].value,
    };
  }

  // Initialize a new GitHub connector instance for every GraphQL request, so that API fetches
  // are deduplicated per-request only.
  const gitHubConnector = new GitHubConnector({
    clientId: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
  });

  return {
    schema,
    context: {
      user: { login: 'testuser'},
      Users: new Users({ connector: gitHubConnector }),
      PoliticalEvents: new PoliticalEvents(),
      Lookups: new Lookups(),
      LookupItems: new LookupItems(),
      Issues: new Issues(),
      ActionItems: new ActionItems(),
      Resources: new Resources(),
      Officials: new Officials()
    },
  };
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

// Serve our helpful static landing page. Not used in production.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log( // eslint-disable-line no-console
  `API Server is now running on http://localhost:${PORT}`
));