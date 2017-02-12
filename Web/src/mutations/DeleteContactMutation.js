import Relay from 'react-relay';

export default class DeleteContactMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`fragment on ReindexViewer {
      id
      allContacts(first: 1000000) {
        count,
      }
    }`
  };

  getMutation() {
    return Relay.QL`mutation{ deleteContact }`;
  }

  getVariables() {
    return {
      id: this.props.id,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on _ContactPayload {
        id,
        viewer {
          id,
          allContacts {
            count,
          }
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'allContacts',
      deletedIDFieldName: 'id',
    }, {
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        viewer: this.props.viewer.id,
      },
    }];
  }

  getOptimisticResponse() {
    return {
      id: this.props.id,
      viewer: {
        id: this.props.viewer.id,
        allContacts: {
          count: this.props.viewer.allContacts.count - 1,
        },
      },
    };
  }
}