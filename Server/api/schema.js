import { merge } from 'lodash';
import { schema as gitHubSchema, resolvers as gitHubResolvers } from './github/schema';
import { schema as sqlSchema, resolvers as sqlResolvers } from './sql/schema';
import { makeExecutableSchema } from 'graphql-tools';

const rootSchema = [`

type Query {
  officials(offset: Int, limit: Int): [Official]
  official(ID: Int!): Official
  officialsByGovernmentLevel(governmentLevelId: Int!): [Official]
  officialsByGovernmentLevelAndGeography(governmentLevelId: Int!, geographyId: String!): [Official]

  resources(offset: Int, limit: Int): [Resource]
  resource(ID: Int!): Resource
  resourcesByIssue(issue_ID: Int!): [Resource]
  resourcesByOfficial(official_ID: Int!): [Resource]
  resourcesByPoliticalEvent(politicalEvent_ID: Int!): [Resource]

  politicalEvents(type: PoliticalEventType, offset: Int, limit: Int): [PoliticalEvent]
  politicalEvent(ID: Int!): PoliticalEvent
  politicalEventsByOfficial(official_ID: Int!): [PoliticalEvent]

  issues(offset: Int, limit: Int): [Issue]
  issue(ID: Int!): Issue

  actionItems(offset: Int, limit: Int): [ActionItem]
  actionItem(ID: Int!): ActionItem
  actionItemsByIssue(Issue_ID: Int!): [ActionItem]

  lookups(offset: Int, limit: Int): [Lookup]
  lookup(ID: Int!): Lookup

  lookupItems(lookup_ID: Int!): [LookupItem]

  # Return the currently logged in user, or null if nobody is logged in
  currentUser: User
}

type Mutation {
  submitIssue(issueName: String!, issueDescription: String!): Issue
  submitActionItem(issue_ID: Int!, actionItemName: String!, actionItemStartDate: Float!,actionItemEndDate: Float!, actionItemType: Int!, actionItemDescription: String!): ActionItem
  submitOfficial(firstName: String!, lastName: String!, governmentLevelId: Int!, geographyId: String!, gender:Int!, party:Int!, phone: String!, email: String!, url: String!, contactForm: String!, facebook: String!, twitter: String!): Official
  submitResource(resourceName: String!, resourceDescription: String!, url: String!, media: String!, resourceRelation: String!, resourceRelationIdentifier:Int! ): Resource  
  submitPoliticalEvent(politicalEventName: String!, politicalEventDescription: String!, politicalEventDate: Float!, politicalEventTime: Float!, politicalEventType: Int!, politicalEventRelation: String!, politicalEventRelationIdentifier: Int!): PoliticalEvent  
}

schema {
  query: Query
  mutation: Mutation
}

`];

const rootResolvers = {
  Query: {
    officials(root, { offset, limit }, context) {
      const protectedLimit = (limit < 1 || limit > 10) ? 10 : limit;
      return context.Officials.getAll(protectedLimit, offset)
    },

    official(root, { ID }, context) {
      return context.Officials.getOfficialsById(ID);
    },

    officialsByGovernmentLevel(root, { governmentLevelId }, context) {
      return context.Officials.getByGovernmentLevel(governmentLevelId)
    },

    officialsByGovernmentLevelAndGeography(root, { governmentLevelId, geographyId }, context) {
      return context.Officials.getByGovernmentLevelAndGeographyId(governmentLevelId, geographyId)
    },

    resources(root, { offset, limit }, context) {
      const protectedLimit = (limit < 1 || limit > 10) ? 10 : limit;
      return context.Resources.getAll(protectedLimit, offset)
    },

    resource(root, { ID }, context) {
      return context.Resources.getResourceById(ID);
    },

    resourcesByIssue(root, { issue_ID, offset, limit }, context) {
      const protectedLimit = (limit < 1 || limit > 10) ? 10 : limit;
      return context.Resources.getReourcesByIssueId(issue_ID, protectedLimit, offset)
    },

    resourcesByOfficial(root, { official_ID, offset, limit }, context) {
      const protectedLimit = (limit < 1 || limit > 10) ? 10 : limit;
      return context.Resources.getReourcesByOfficialId(official_ID, protectedLimit, offset)
    },

    resourcesByPoliticalEvent(root, { politicalEvent_ID, offset, limit }, context) {
      const protectedLimit = (limit < 1 || limit > 10) ? 10 : limit;
      return context.Resources.getReourcesByPoliticalEventId(politicalEvent_ID, protectedLimit, offset)
    },

    politicalEvents(root, { type, offset, limit }, context) {
      const protectedLimit = (limit < 1 || limit > 10) ? 10 : limit;
      return context.PoliticalEvents.getAll(protectedLimit, offset)
    },

    politicalEvent(root, { ID }, context) {
      return context.PoliticalEvents.getEventsById(ID);
    },

    politicalEventsByOfficial(root, { official_ID }, context) {
      return context.PoliticalEvents.getByOfficialId(official_ID)
    },

    issues(root, { offset, limit }, context) {
      const protectedLimit = (limit < 1 || limit > 10) ? 10 : limit;
      return context.Issues.getAll(protectedLimit, offset)
    },

    issue(root, { ID }, context) {
      return context.Issues.getIssueById(ID);
    },

    actionItems(root, { offset, limit }, context) {
      const protectedLimit = (limit < 1 || limit > 10) ? 10 : limit;
      return context.ActionItems.getAll(protectedLimit, offset)
    },

    actionItem(root, { ID }, context) {
      return context.ActionItems.getActionItemById(ID);
    },

    actionItemsByIssue(root, { issue_ID, offset, limit }, context) {
      const protectedLimit = (limit < 1 || limit > 10) ? 10 : limit;
      return context.Issues.getActionItemsByIssueId(issue_ID, protectedLimit, offset)
    },

    lookups(root, { offset, limit }, context) {
      const protectedLimit = (limit < 1 || limit > 10) ? 10 : limit;
      return context.Lookups.getAll(protectedLimit, offset)
    },

    lookup(root, { ID }, context) {
      return context.Lookups.getLookupById(ID);
    },

    lookupItems(root, { lookup_ID }, context) {
      return context.LookupItems.getLookupItemsByLookupId(lookup_ID);
    },

    currentUser(root, args, context) {
      return context.user || null;
    }
  },
   Mutation: {
    submitIssue(root, { issueName, issueDescription }, context) {
      if (!context.user) {
        throw new Error('Must be logged in to submit an issue.');
      }

      return Promise.resolve()
        .then(() => (
          context.Issues.submitIssue(issueName, issueDescription, context.user.login)
        ))
        .then(() => context.Issues.getIssueByName(issueName));
    },
    submitActionItem(root, { issue_ID, actionItemName, actionItemStartDate, actionItemEndDate, actionItemType, actionItemDescription }, context) {
      if (!context.user) {
        throw new Error('Must be logged in to submit an issue.');
      }

      return Promise.resolve()
        .then(() => (
          context.ActionItems.submitActionItem(issue_ID, actionItemName, actionItemDescription, actionItemStartDate, actionItemEndDate, actionItemType, context.user.login)
        ))
        .then(() => context.ActionItems.getActionItemByName(actionItemName));
    },
    submitOfficial(root, { firstName, lastName, governmentLevelId, geographyId, gender, party, phone, email, url, contactFrom, facebook, twitter }, context) {
      if (!context.user) {
        throw new Error('Must be logged in to submit an issue.');
      }

      return Promise.resolve()
        .then(() => (
          context.Officials.submitOfficial(firstName, lastName, governmentLevelId, geographyId, gender, party, phone, email, url, contactFrom, facebook, twitter, context.user.login)
        ))
        .then(() => context.Officials.getOfficialByName(firstName, lastName));
    },
    submitResource(root, { resourceName, resourceDescription, url, media, resourceRelation, resourceRelationIdentifier }, context) {
      if (!context.user) {
        throw new Error('Must be logged in to submit an issue.');
      }

      return Promise.resolve()
        .then(() => (
          context.Resources.submitResource(resourceName, resourceDescription, url, media, resourceRelation, resourceRelationIdentifier, context.user.login)
        ))
        .then(() => context.Resources.getResourceByName(resourceName));
    },
    submitPoliticalEvent(root, { politicalEventName, politicalEventDescription, politicalEventDate, politicalEventTime, politicalEventType, politicalEventRelation,politicalEventRelationIdentifier}, context) {
      if (!context.user) {
        throw new Error('Must be logged in to submit an issue.');
      }

      return Promise.resolve()
        .then(() => (
          context.PoliticalEvents.submitPoliticalEvent(politicalEventName, politicalEventDescription, politicalEventDate, politicalEventTime, politicalEventType, politicalEventRelation, politicalEventRelationIdentifier, context.user.login)
        ))
        .then(() => context.PoliticalEvents.getPoliticalEventsByName(politicalEventName));
    }
  }
};

// Put schema together into one array of schema strings
// and one map of resolvers, like makeExecutableSchema expects
const schema = [...rootSchema, ...gitHubSchema, ...sqlSchema];
const resolvers = merge(rootResolvers, gitHubResolvers, sqlResolvers);

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;
