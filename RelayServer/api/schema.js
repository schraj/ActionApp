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

import { getLookup, getAllLookups, submitLookup } from './models/lookup';
import { getLookupItemsByLookupId, getLookupItem, getAllLookupItems, submitLookupItem } from './models/lookupItem';
import { getIssue, getAllIssues, submitIssue, getIssueByName } from './models/issue';
import { getChannel, getAllChannels, submitChannel } from './models/channel';
import { getActionItem, getAllActionItems, getActionItemsByIssue, getActionItemsByOfficial, submitActionItem } from './models/actionItem';
import { getOfficial, getAllOfficials, getOfficialsByActionItem, submitOfficial } from './models/official';
import { getResource, getAllResources, getResourcesByOfficial, getResourcesByIssue, getResourcesByPoliticalEvent, submitResource } from './models/resource';
import { getPoliticalEvent, getAllPoliticalEvents, submitPoliticalEvent } from './models/politicalEvent';
import { getAppUser, getAllAppUsers, submitAppUsers, handleActionItem, getViewer } from './models/appuser';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve a node object to its GraphQL type.
 */
const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Channel') {
      return getChannel(id);
    }
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
    } 
    if (type === 'AppUser') {
      return getAppUser(id);
    }    
    else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Channel) {
      return channelType;
    } else if (obj instanceof Official) {
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
    } else if (obj instanceof AppUser) {
      return appUserType;
    }
    return null;
  }
);

const channelType = new GraphQLObjectType({
  name: 'Channel',
  description: 'A political channel',
  fields: () => ({
    id: globalIdField("Channel"),
    ChannelId: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'id in db',
      resolve: (channel) => channel.ID,
    },
    ChannelName: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (channel) => 'Democracy',
    },
    ChannelDescription: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (channel) => 'Reclaiming democracy from the right-wing nationalists',
    },
    Issues: {
      type: issueConnection,
      args: connectionArgs,
      resolve: (channel, args) => {
        return connectionFromPromisedArray(getAllIssues(100,0), args);
      }
    }
  }),
    interfaces: [nodeInterface],
});


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
        return connectionFromPromisedArray(getPoliticalEventsByOfficial(official.ID), args)
      }
    },
    Resources: {
      type: resourceConnection,
      args: connectionArgs,
      resolve: (official, args) => {
        return connectionFromPromisedArray(getResourcesByOfficial(official.ID), args)
      }
    },
    ActionItems: {
      type: actionItemConnection,
      args: connectionArgs,
      resolve: (official, args) => {
        return connectionFromPromisedArray(getActionItemsByOfficial(official.ID), args)
      }
    }
  }),
  interfaces: [nodeInterface],
});

const issueType = new GraphQLObjectType({
  name: 'Issue',
  description: 'A political issue',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'global',
      resolve: (issue) => `Issue` + issue.ID.toString(),
    }, 
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
        return connectionFromPromisedArray(getActionItemsByIssue(issue.ID), args);
      }
    },
    Resources: {
      type: resourceConnection,
      args: connectionArgs,
      resolve: (issue, args) => {
        return connectionFromPromisedArray(getResourcesByIssue(issue.ID), args)
      }
    },
  }),

  interfaces: [nodeInterface],
});

const actionItemType = new GraphQLObjectType({
  name: 'ActionItem',
  description: 'An action item',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'global',
      resolve: (actionItem) => `actionItem` + actionItem.ID.toString(),
    }, 
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
        return connectionFromPromisedArray(getOfficialsByActionItem(actionItem.ID), args)
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
        return connectionFromPromisedArray(getIssue(actionItem.issue_ID), args)
      }
    },
    Resources: {
      type: resourceConnection,
      args: connectionArgs,
      resolve: (politicalEvent, args) => {
        return connectionFromPromisedArray(getResourcesByPoliticalEvent(politicalEvent.ID), args)
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
        return connectionFromPromisedArray(getLookup(lookupItem.lookup_ID), args)
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
        return connectionFromPromisedArray(getLookupItemsByLookupId(lookup.ID), args)
      }
    }
  }),
  interfaces: [nodeInterface],
});

const appUserType = new GraphQLObjectType({
  name: 'AppUser',
  description: 'An App User',
  fields: () => ({
    id: globalIdField('AppUser'),
    appUserId: {
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
    Email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    Address1: {
      type: new GraphQLNonNull(GraphQLString),
    },
    Address2: {
      type: new GraphQLNonNull(GraphQLString),
    },
    Zipcode: {
      type: new GraphQLNonNull(GraphQLString),
    },
    City: {
      type: new GraphQLNonNull(GraphQLString),
    },
    State: {
      type: new GraphQLNonNull(GraphQLString),
    },
    Gender: {
      type: GraphQLInt,
    },
    Points: {
      type: new GraphQLNonNull(GraphQLString),
    },
    ActionItems: {
      type: actionItemConnection,
      args: connectionArgs,
      resolve: (appUser, args) => {
        return connectionFromPromisedArray(getActedUponActionItemsByAppUser(appUser.ID), args)
      }
    },
    Channels: {
      type: channelConnection,
      args: connectionArgs,
      resolve: (appUser, args) => {
        return connectionFromPromisedArray(getAllChannels(100,0), args)
      }
    }

  }),
  interfaces: [nodeInterface],
});

const {
  connectionType: channelConnection,
  edgeType: ChannelEdge,
} = connectionDefinitions({ name: 'Channel', nodeType: channelType });

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
    viewer: {
      type: appUserType,
      resolve: () => getViewer(),
    },
    channel: {
      type: channelType,
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      resolve: (root, { id }) => getChannel(id),
    },
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
    appUser: {
      type: appUserType,
      args: {
        appUser_ID: {
          type: GraphQLInt,
        },
      },
      resolve: (root, { appUser_ID }) => getAppUser(appUser_ID),
    },
    appUsers: {
      type: new GraphQLList(appUserType),
      args: {
        limit: {
          type: GraphQLInt,
        },
        offset: {
          type: GraphQLInt,
        }
      },
      resolve: (root, { limit, offset }) => getAllAppUsers(limit, offset),
    },

    node: nodeField,
  }),
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    submitIssue: SubmitIssueMutation,
    submitActionItem: SubmitActionItemMutation,
    submitLookup: SubmitLookupMutation,
    submitLookupItem: SubmitLookupItemMutation,
    submitOfficial: SubmitOfficialMutation,
    submitResource: SubmitResourceMutation,
    submitPoliticalEvent: SubmitPoliticalEventMutation,
    submitAppUser: SubmitAppUserMutation,
    handleActionItemByUser: HandleActionItemByUserMutation,
  })
});

const SubmitIssueMutation = mutationWithClientMutationId({
  name: 'SubmitIssue',
  inputFields: {
    issueName: { type: new GraphQLNonNull(GraphQLString) },
    issueDescription: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    issue: {
      type: issueType,
      resolve: ({ issueId }) => getIssue(issueId)
  }
  },
  mutateAndGetPayload: ({ issueName, issueDescription }) => {
    return new Promise((resolve, reject) => {
        submitIssue(issueName, issueDescription).then((issueId)=> {
          resolve({ issueId })  
        })
    });
  }
});

const SubmitActionItemMutation = mutationWithClientMutationId({
  name: 'SubmitActionItem',
  inputFields: {
    issue_ID: { type: new GraphQLNonNull(GraphQLInt) },
    actionItemName: { type: new GraphQLNonNull(GraphQLString) },
    actionItemDescription: { type: new GraphQLNonNull(GraphQLString) },
    actionItemStartDate: { type: new GraphQLNonNull(GraphQLFloat) },
    actionItemEndDate: { type: new GraphQLNonNull(GraphQLFloat) },
    actionItemType: { type: new GraphQLNonNull(GraphQLInt) },    
  },
  outputFields: {
    actionItem: {
      type: actionItemType,
      resolve: ({ actionItemId }) => getActionItem(actionItemId)
  }
  },
  mutateAndGetPayload: ({ issue_ID, actionItemName, actionItemStartDate, actionItemEndDate, actionItemType, actionItemDescription }) => {
    return new Promise((resolve, reject) => {
        submitActionItem(issue_ID, actionItemName, actionItemStartDate, actionItemEndDate, actionItemType, actionItemDescription).then((actionItemId)=> {
          resolve({ actionItemId })  
        })
    });
  }
});

const SubmitOfficialMutation = mutationWithClientMutationId({
  name: 'SubmitOfficial',
  inputFields: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    governmentLevelId: { type: new GraphQLNonNull(GraphQLInt) },
    geographyId: { type: new GraphQLNonNull(GraphQLInt) },
    gender: { type: GraphQLString },
    phone: { type: GraphQLString },
    url: { type: GraphQLString },
    contactForm: { type: GraphQLString },
    twitter: { type: GraphQLString },
    facebook: { type: GraphQLString }    
  },
  outputFields: {
    official: {
      type: officialType,
      resolve: ({ officialId }) => getOfficial(officialId)
  }
  },
  mutateAndGetPayload: ({ firstName, lastName, governmentLevelId, geographyId, gender, phone, email, url, contactForm,twitter, facebook }) => {
    return new Promise((resolve, reject) => {
        submitOfficial(firstName, lastName, governmentLevelId, geographyId, gender, phone, email, url, contactForm,twitter, facebook).then((officialId)=> {
          resolve({ officialId })            
        })
    });
  }
});

const SubmitResourceMutation = mutationWithClientMutationId({
  name: 'SubmitResource',
  inputFields: {
    resourceName: { type: new GraphQLNonNull(GraphQLString) },
    resourceDescription: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: GraphQLString },
    media: { type: GraphQLString },
    resourceRelationType: {type: GraphQLInt},
    resourceRelationId: {type: GraphQLInt}
  },
  outputFields: {
    resource: {
      type: resourceType,
      resolve: ({ resourceId }) => getResource(resourceId)
  }
  },
  mutateAndGetPayload: ({ resourceName, url, media, resourceDescription, resourceRelationType, resourceRelationId }) => {
    return new Promise((resolve, reject) => {
        submitResource(resourceName, url, media, resourceDescription, resourceRelationType, resourceRelationId).then((resourceId)=> {
          resolve({ resourceId })  
        })
    });
  }
});

const SubmitPoliticalEventMutation = mutationWithClientMutationId({
  name: 'SubmitPoliticalEvent',
  inputFields: {
    politicalEventName: { type: new GraphQLNonNull(GraphQLString) },
    politicalEventDescription: { type: new GraphQLNonNull(GraphQLString) },
    politicalEventDate: { type: new GraphQLNonNull(GraphQLFloat) },
    politicalEventTime: { type: new GraphQLNonNull(GraphQLString) },
    politicalEventType: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    politicalEvent: {
      type: politicalEventType,
      resolve: ({ politicalEventId }) => getPoliticalEvent(politicalEventId)
  }
  },
  mutateAndGetPayload: ({ eventName, eventDate, eventTime, eventDescription, eventType }) => {
    return new Promise((resolve, reject) => {
        submitPoliticalEvent(eventName, eventDate, eventTime, eventDescription, eventType).then((politicalEventId)=> {
          resolve({ politicalEventId })  
        })
    });
  }
});

const SubmitLookupMutation = mutationWithClientMutationId({
  name: 'SubmitLookup',
  inputFields: {
    lookupName: { type: new GraphQLNonNull(GraphQLString) },
    displayName: { type: new GraphQLNonNull(GraphQLString) },
    lookupDescription: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    lookup: {
      type: lookupType,
      resolve: ({ lookupId }) => getLookup(lookupId)
  }
  },
  mutateAndGetPayload: ({ lookupName, displayName, lookupDescription }) => {
    return new Promise((resolve, reject) => {
        submitLookup(lookupName, displayName, lookupDescription).then((lookupId)=> {
          resolve({ lookupId })  
        })
    });
  }
});

const SubmitLookupItemMutation = mutationWithClientMutationId({
  name: 'SubmitLookupItem',
  inputFields: {
    lookup_ID: { type: new GraphQLNonNull(GraphQLInt) },
    lookupItemDefinition: { type: new GraphQLNonNull(GraphQLString) },
    lookupItemName: { type: new GraphQLNonNull(GraphQLString) },
    displayName: { type: new GraphQLNonNull(GraphQLString) },
    lookupItemDescription: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    lookupItem: {
      type: lookupItemType,
      resolve: ({ lookupItemId }) => getLookupItem(lookupItemId)
  }
  },
  mutateAndGetPayload: ({ lookup_ID, lookupItemDefinition, lookupItemName, displayName, lookupItemDescription }) => {
    return new Promise((resolve, reject) => {
        submitLookupItem(lookupId, lookupItemDefinition, lookupItemName, displayName, lookupItemDescription).then((lookupItemId)=> {
          resolve({ lookupItemId })  
        })
    });
  }
});

const SubmitAppUserMutation = mutationWithClientMutationId({
  name: 'SubmitAppUser',
  inputFields: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    address1: { type: new GraphQLNonNull(GraphQLString) },
    address2: { type: new GraphQLNonNull(GraphQLString) },
    zipcode: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    state: { type: new GraphQLNonNull(GraphQLString) },
    gender: { type: GraphQLString },
    points: { type: new GraphQLNonNull(GraphQLInt) },
  },
  outputFields: {
    appUser: {
      type: appUserType,
      resolve: ({ appUserId }) => getAppUser(appUserId)
  }
  },
  mutateAndGetPayload: ({ firstName, lastName, email, address1, address2, zipcode, city, state, gender, points }) => {
    return new Promise((resolve, reject) => {
        submitAppUser(firstName, lastName, email, address1, address2, zipcode, city, state, gender, points).then((appUserId)=> {
          resolve({ appUserId })  
        })
    });
  }
});

const HandleActionItemByUserMutation = mutationWithClientMutationId({
  name: 'HandleActionItemByUser',
  inputFields: {
    actionItem_ID: { type: new GraphQLNonNull(GraphQLInt) },
    appUser_ID: { type: new GraphQLNonNull(GraphQLInt) },
    handleActionType: { type: new GraphQLNonNull(GraphQLInt) },
  },
  outputFields: {
    appUser: {
      type: appUserType,
      resolve: ({ appUserId }) => getAppUser(appUserId)
  }
  },
  mutateAndGetPayload: ({ actionItem_ID, appUser_ID, handleactionType  }) => {
    return new Promise((resolve, reject) => {
        submitAppUser(actionItem_ID, appUser_ID, handleactionType).then((appUserId)=> {
          resolve({ appUserId })  
        })
    });
  }
});


const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

export default schema;