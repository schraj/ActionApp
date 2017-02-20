## Getting started

 Make sure your node version is at least 7:

```sh
node -v
```

Install the dependencies:

```sh
yarn # or npm install
```

### Create a new project

Create a new project with this data model:

```graphql
type Image {
  id: ID!
  name: String!
}
```

Copy your **project endpoint**:

![](http://i.imgur.com/ytXDR4B.gif)

Replace `__PROJECT_ID__` in `create-image.js` and `migrate-images.js` with your **project endpoint**.

### Upload test data

Run `create-images.js` to upload the test data:

```sh
npm run upload
```
### Migrate the images

Run `migrate-images.js` to upload the test data:

```sh
npm run migrate
```

## Help & Community [![Slack Status](https://slack.graph.cool/badge.svg)](https://slack.graph.cool)

Join our [Slack community](http://slack.graph.cool/) if you run into issues or have questions. We love talking to you!

![](http://i.imgur.com/5RHR6Ku.png)
