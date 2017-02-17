import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  connectionFromPromisedArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import { getLookup, getAllLookups } from './models/lookup';
import { getLookupItemsByLookupId, getLookupItem, getAllLookupItems } from './models/lookupItem';
import { getIssue, getAllIssues } from './models/issue';
import { getActionItem, getAllActionItems, getActionItemsByIssue, getActionItemsByOfficial } from './models/actionItem';
import { getOfficial, getAllOfficials, getOfficialsByActionItem } from './models/official';
import { getResource, getAllResources, getResourcesByOfficial, getResourcesByIssue, getResourcesByPoliticalEvent } from './models/resource';
import { getPoliticalEvent, getAllPoliticalEvents } from './models/politicalEvent';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve a node object to its GraphQL type.
 */
const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Official') {
      return getOfficial(id);
    }
    if (type === 'Issue') {
      return getIssue(id);
    }
    if (type === 'ActionItem') {
      return getActionItem(id);
    }
    if (type === 'Resource') {
      return getResource(id);
    }
    if (type === 'PoliticalEvent') {
      return getPoliticalEvent(id);
    }
    if (type === 'Lookup') {
      return getLookup(id);
    }
    if (type === 'LookupItem') {
      return getLookupItem(id);
    } else {
      return null;
    }
  },
  (obj) => { 
    if (obj instanceof Official) {
      return officialType;
    } else if (obj instanceof Issue) {
      return issueType;
    } else if (obj instanceof Resource) {
      return resourceType;
    } else if (obj instanceof ActionItem) {
      return actionItemType;
    } else if (obj instanceof PoliticalEvent) {
      return politicalEventType;
    } else if (obj instanceof Lookup) {
      return lookupType;
    } else if (obj instanceof LookupItem) {
      return lookupItemType;
    }
    return null;
  }
);

const officialType = new GraphQLObjectType({
  name: 'Official',
  description: 'A political official',
  fields: () => ({
    id: globalIdField('Official'),
    officialId: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'id of lookup item in db',
      resolve: (official) => official.ID,
    },
    FirstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    LastName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    GovernmentLevelId: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    GeographyId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    Gender: {
      type: GraphQLString,
    },
    Party: {
      type: GraphQLString,
    },
    Phone: {
      type: GraphQLString,
    },
    Email: {
      type: GraphQLString,
    },
    Url: {
      type: GraphQLString,
    },
    ContactForm: {
      type: GraphQLString,
    },
    Twitter: {
      type: GraphQLString,
    },
    Facebook: {
      type: GraphQLString,
    },
    PoliticalEvents: {
      type: politicalEventConnection,
      args: connectionArgs,
      resolve: (official, args) => {  
          return connectionFromPromisedArray(getPoliticalEventsByOfficial(official.ID),args)
      }
    },
    Resources: {
      type: resourceConnection,
      args: connectionArgs,
      resolve: (official, args) => {  
          return connectionFromPromisedArray(getResourcesByOfficial(official.ID),args)
      }
    },
    ActionItems: {
      type: actionItemConnection,
      args: connectionArgs,
      resolve: (official, args) => {  
          return connectionFromPromisedArray(getActionItemsByOfficial(official.ID),args)
      }
    }
  }),
  interfaces: [nodeInterface],
});

const issueType = new GraphQLObjectType({
  name: 'Issue',
  description: 'A political issue',
  fields: () => ({
    id: globalIdField('Issue'),
    IssueId: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'id in db',
      resolve: (issue) => issue.ID,
    },
    IssueName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    IssueDescription: {
      type: new GraphQLNonNull(GraphQLString),
    },
    ActionItems: {
      type: actionItemConnection,
      args: connectionArgs,
      resolve: (issue, args) => {
         return connectionFromPromisedArray(getActionItemsByIssue(issue.ID),args);
      }
    },
    Resources: {
      type: resourceConnection,
      args: connectionArgs,
      resolve: (issue, args) => {  
          return connectionFromPromisedArray(getResourcesByIssue(issue.ID),args)
      }
    },
  }),
  
  interfaces: [nodeInterface],
});

const actionItemType = new GraphQLObjectType({
  name: 'ActionItem',
  description: 'An action item',
  fields: () => ({
    id: globalIdField('ActionItem'),
    ActionItemId: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'id in db',
      resolve: (actionItem) => actionItem.ID,
    },
    ActionItemName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    ActionItemDescription: {
      type: new GraphQLNonNull(GraphQLString),
    },
    ActionItemStartDate: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    ActionItemEndDate: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    ActionItemType: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    Issue: {
      type: issueType,
      args: connectionArgs,
      resolve: (actionItem, args) => getIssue(actionItem.Issue_ID)
    },
    Officials: {
      type: officialConnection,
      args: connectionArgs,
      resolve: (actionItem, args) => {  
          return connectionFromPromisedArray(getOfficialsByActionItem(actionItem.ID),args)
      }
    }
  }),
  interfaces: [nodeInterface],
});

const politicalEventType = new GraphQLObjectType({
  name: 'PoliticalEvent',
  description: 'An political event',
  fields: () => ({
    id: globalIdField('PoliticalEvent'),
    PoliticalEventId: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'id in db',
      resolve: (politicalEvent) => politicalEvent.ID,
    },
    PoliticalEventName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    PoliticalEventDescription: {
      type: new GraphQLNonNull(GraphQLString),
    },
    PoliticalEventDate: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    PoliticalEventTime: {
      type: new GraphQLNonNull(GraphQLString),
    },
    PoliticalEventType: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    Issue: {
      type: issueType,
      args: connectionArgs,
      resolve: (actionItem, args) => {  
          return connectionFromPromisedArray(getIssue(actionItem.issue_ID),args)
      }
    },
    Resources: {
      type: resourceConnection,
      args: connectionArgs,
      resolve: (politicalEvent, args) => {  
          return connectionFromPromisedArray(getResourcesByPoliticalEvent(politicalEvent.ID),args)
      }
    }
  }),
  interfaces: [nodeInterface],
});

const resourceType = new GraphQLObjectType({
  name: 'Resource',
  description: 'An resource',
  fields: () => ({
    id: globalIdField('Resource'),
    resourceId: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'id in db',
      resolve: (resource) => resource.ID,
    },
    ResourceName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    ResourceDescription: {
      type: new GraphQLNonNull(GraphQLString),
    },
    Url: {
      type: GraphQLString,
    },
    Media: {
      type: GraphQLString,
    },
  }),
  interfaces: [nodeInterface],
});

const lookupItemType = new GraphQLObjectType({
  name: 'LookupItem',
  description: 'A lookup item',
  fields: () => ({
    id: globalIdField('LookupItem'),
    lookupItemId: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'id in db',
      resolve: (lookupItem) => lookupItem.ID,
    },
    LookupItemDefinition: {
      type: new GraphQLNonNull(GraphQLString),
    },
    LookupItemName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    DisplayName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    LookupDescription: {
      type: GraphQLString,
    },
    Lookup: {
      type: lookupConnection,
      args: connectionArgs,
      resolve: (lookupItem, args) => {  
          return connectionFromPromisedArray(getLookup(lookupItem.lookup_ID),args)
      }
    },
  }),
  interfaces: [nodeInterface],
});

const lookupType = new GraphQLObjectType({
  name: 'Lookup',
  description: 'A lookup',
  fields: () => ({
    id: globalIdField('Lookup'),
    LookupId: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'id of lookup in db',
      resolve: (lookup) => lookup.ID,
    },
    LookupName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    DisplayName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    LookupDescription: {
      type: GraphQLString,
    },
    LookupItems: {
      type: lookupItemConnection,
      description: 'The lookupItems in the lookup',
      args: connectionArgs,
      resolve: (lookup, args) => {  
          return connectionFromPromisedArray(getLookupItemsByLookupId(lookup.ID),args)
      }
    }
  }),
  interfaces: [nodeInterface],
});

const {
  connectionType: officialConnection,
  edgeType: OfficialEdge,
} = connectionDefinitions({ name: 'Official', nodeType: officialType });

const {
  connectionType: actionItemConnection,
  edgeType: ActionItemEdge,
} = connectionDefinitions({ name: 'ActionItem', nodeType: actionItemType });

const {
  connectionType: issueConnection,
  edgeType: IssueEdge,
} = connectionDefinitions({ name: 'Issue', nodeType: issueType });

const {
  connectionType: politicalEventConnection,
  edgeType: PoliticalEventEdge,
} = connectionDefinitions({ name: 'PoliticalEvent', nodeType: politicalEventType });

const {
  connectionType: resourceConnection,
  edgeType: ResourceEdge,
} = connectionDefinitions({ name: 'Resource', nodeType: resourceType });

const {
  connectionType: lookupConnection,
  edgeType: LookupEdge,
} = connectionDefinitions({ name: 'Lookup', nodeType: lookupType });

const {
  connectionType: lookupItemConnection,
  edgeType: LookupItemEdge,
} = connectionDefinitions({ name: 'LookupItem', nodeType: lookupItemType });

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    official: {
      type: officialType,
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      resolve: (root, { id }) => getOfficial(id),
    },
    officials: {
      type: new GraphQLList(officialType),
      args: {
        limit: {
          type: GraphQLInt,
        },
        offset: {
          type: GraphQLInt,          
        }
      },
      resolve: (root, { limit, offset }) => getAllOfficials(limit, offset),
    },
    issue: {
      type: issueType,
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      resolve: (root, { id }) => getIssue(id),
    },
    issues: {
      type: new GraphQLList(issueType),
      args: {
        limit: {
          type: GraphQLInt,
        },
        offset: {
          type: GraphQLInt,          
        }
      },
      resolve: (root, { limit, offset }) => getAllIssues(limit, offset),
    },
    actionItem: {
      type: actionItemType,
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      resolve: (root, { id }) => getActionItem(id),
    },
    actionItems: {
      type: new GraphQLList(actionItemType),
      args: {
        limit: {
          type: GraphQLInt,
        },
        offset: {
          type: GraphQLInt,          
        }
      },
      resolve: (root, { limit, offset}) => getAllActionItems(limit, offset),
    },
    resource: {
      type: resourceType,
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      resolve: (root, { id }) => getResource(id),
    },
    resources: {
      type: new GraphQLList(resourceType),
       args: {
        limit: {
          type: GraphQLInt,
        },
        offset: {
          type: GraphQLInt,          
        }
      },
      resolve: (root, {limit, offset}) => getAllResources(limit, offset),
    },
    politicalEvent: {
      type: politicalEventType,
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      resolve: (root, { id }) => getPoliticalEvent(id),
    },
    politicalEvents: {
      type: new GraphQLList(politicalEventType),
      args: {
        limit: {
          type: GraphQLInt,
        },
        offset: {
          type: GraphQLInt,          
        }
      },
      resolve: (root, {limit, offset }) => getAllPoliticalEvents(limit, offset),
    },
    lookup: {
      type: lookupType,
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      resolve: (root, { id }) => getLookup(id),
    },
    lookups: {
      type: new GraphQLList(lookupType),
      resolve: (root, { }) => getAllLookups(),
    },
    lookupItem: {
      type: lookupItemType,
      args: {
        lookupItem_ID: {
          type: GraphQLInt,
        },
      },
      resolve: (root, { lookupItem_ID }) => getLookupItemById(lookupItem_ID),
    },
    lookupItems: {
      type: new GraphQLList(lookupItemType),
      args: {
        lookup_ID: {
          type: GraphQLInt,
        },
      },
      resolve: (root, { lookup_ID }) => getLookupItemsByLookupId(lookup_ID),
    },
    node: nodeField,
  }),
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
const schema = new GraphQLSchema({
  query: queryType
  //mutation: mutationType,
});

export default schema;