# Admin app for Action app 

Fork and clone the repository.

Install dependencies

```
npm install
```


Run and open on localhost:3000

```
npm start
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

