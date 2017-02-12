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
import { Repositories, Users } from './github/models';
import { Events } from './sql/models';

import { createServer } from 'http';

import schema from './schema';

import config from './config';

let PORT = 3010;
if (process.env.PORT) {
  PORT = parseInt(process.env.PORT, 10) + 100;
}

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  '/graphql',
  (req, resp, next) => {
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
      user,
      Users: new Users({ connector: gitHubConnector }),
      Events: new Events(),
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
