import express from 'express';
import Koa from 'koa';
import graphQLHTTP from 'koa-graphql';
import mount from 'koa-mount';
import convert from 'koa-convert';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import schema from './api/schema';

import fs from 'fs';
import { graphql } from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';

// Save JSON of full schema introspection for Babel Relay Plugin to use
(async () => {
  const result = await (graphql(schema, introspectionQuery));
  if (result.errors) {
    console.error(
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2),
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, './api/schema.json'),
      JSON.stringify(result, null, 2),
    );
  }
})();

fs.writeFileSync(
  path.join(__dirname, './api/schema.graphql'),
  printSchema(schema)
 );

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

// Expose a GraphQL endpoint
const graphQLServer = new Koa();

graphQLServer.use(mount('/', convert(graphQLHTTP({
  schema,
  pretty: true,
  graphiql: true,
}))));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));
