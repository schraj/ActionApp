import { merge } from 'lodash';
import { schema as gitHubSchema, resolvers as gitHubResolvers } from './github/schema';
import { schema as sqlSchema, resolvers as sqlResolvers } from './sql/schema';
import { makeExecutableSchema } from 'graphql-tools';

const rootSchema = [`

# A list of event types
enum EventType {
  TOWNHALL

  SITIN

  PHONECONFERENCE
}

type Event {
  # The SQL ID of this entry
  ID: Int!

  name: String!
  eventDate: Float! #Actually a date
  createdAt: Float! #Actually a date
  eventType: EventType!
  eventDescription: String!
}

type Query {
  events(
    # The sort order for the feed
    type: EventType,

    # The number of items to skip, for pagination
    offset: Int,

    # The number of items to fetch starting from the offset, for pagination
    limit: Int
  ): [Event]

  # A single event
  event(
    # The event id
    eventId: Int!
  ): Event

  # Return the currently logged in user, or null if nobody is logged in
  currentUser: User
}



schema {
  query: Query
}

`];

const rootResolvers = {
  Query: {
    events(root, { type, offset, limit }, context) {
      // Ensure API consumer can only fetch 10 items at most
      const protectedLimit = (limit < 1 || limit > 10) ? 10 : limit;
      return context.Events.getEvents(type, offset, protectedLimit);
    },
    event(root, { offset, limit }, context) {
      return context.Events.getAll(offset, limit);
    },
    currentUser(root, args, context) {
      return context.user || null;
    },
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
