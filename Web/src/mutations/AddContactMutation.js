import Relay from 'react-relay';

export default class AddContactMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`fragment on ReindexViewer {
      id
      allContacts {
        count,
      }
    }`
  };

  getMutation() {
    return Relay.QL`mutation{ createContact }`;
  }

  getVariables() {
    return {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      location: this.props.location,
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      isFriend: this.props.isFriend,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on _ContactPayload {
        changedContactEdge,
        viewer {
          id,
          allContacts {
            count
          }
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentID: this.props.viewer.id,
      connectionName: 'allContacts',
      edgeName: 'changedContactEdge',
      rangeBehaviors: {
        '': 'prepend',
      },
    }, {
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        viewer: this.props.viewer.id,
      },
    }];
  }

  getOptimisticResponse() {
    return {
      changedContactEdge: {
        node: {
          firstName: this.props.firstName,
          lastName: this.props.lastName,
          location: this.props.location,
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          isFriend: this.props.isFriend,
        },
      },
      viewer: {
        id: this.props.viewer.id,
        allContacts: {
          count: this.props.viewer.allContacts.count + 1,
        },
      },
    };
  }
}