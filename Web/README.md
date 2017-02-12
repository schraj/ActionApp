# Contact Map using Reindex, React and Relay.

Fork and clone the repository.

Install Reindex CLI library

```
npm install -g reindex-cli
```

Login to Reindex with url and token
reindex login 
URL: "https://bimolecular-oxygen-413.myreindex.com" 
TOKEN "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc0FkbWluIjp0cnVlLCJpYXQiOjE0ODIzMzk3Mjl9.LQLWOhdo4CawqsmFgrfdnJgNgVHM4xxVvEhODwrOMeo"

```

Install dependencies

```
npm install
```

If you update the GraphQL schema:

Fetch current version of your GraphQL schema (you can add `ReindexSchema.json`)
to git after that. Also fetch Relay schema (saved as ./data/schema.json).

```
reindex schema-fetch
reindex schema-relay ./data/schema.json
```

Run and open on localhost:3000

```
npm start
```

Play with GraphiQL

```
reindex graphiql
```

## Deploying

Build minified js and css

```
npm run build
```

Push `build/` directory to static page hosting.
We're using [Surge](https://www.surge.sh)

### Surge

With Surge CLI deploy app:

```sh
npm install -g surge
surge
```

To deploy just go to the Build directory after running "npm run build"
and type "surge"

it will use "schraj@gmail.com" for the user.  call me for password.

This app is currently running at
http://fortunate-fall.surge.sh/

