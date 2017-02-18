import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    viewer: () => Relay.QL`query { viewer }`,
  };

  // static queries = {
  //   ActionAppQuery: (Component) => Relay.QL`
  //     query ActionAppQuery {
  //       viewer { ${Component.getFragment('issues')} },
  //     }
  //   `,
  // };

  static routeName = 'AppHomeRoute';
}
