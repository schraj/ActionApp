import { property, constant } from 'lodash';

export const schema = [`
enum PoliticalEventType {
  TOWNHALL
  SITIN
  PHONECONFERENCE
}

type PoliticalEvent {
  ID: Int!
  PoliticalEventName: String!
  PoliticalEventDateTime: Float! #Actually a date
  CreatedDateTime: String! #Actually a date
  PoliticalEventType: PoliticalEventType!
  PoliticalEventDescription: String!
}

type Official {
  ID: Int!
  FirstName: String!
  LastName: String!
  GovernmentLevelId: Int!
  GeographyId: String!
  Gender: Int
  Party: Int
  Phone: String
  Email: String
  Url: String
  ContactForm: String
  Twitter: String
  Facebook: String
}

type PoliticalEvent_Official {
  ID: Int!
  PoliticalEvent_ID: Int!
  Official_ID: Int!
}

type Issue {
  ID: Int!
  IssueName: String!
  IssueDescription: String!
}

type ActionItem {
  ID: Int!
  Issue_ID: Int!
  ActionItemName: String!
  ActionItemDescription: String!
  ActionItemStartDate: Float #Actually a date
  ActionItemEndDate: Float #Actually a date
  ActionItemType: Int
}

type Resource {
  ID: Int!
  ResourceName: String!
  ResourceDescription: String!
  Url: String!
  Media: String!
}

type Resource_Official {
  ID: Int!
  Resource_ID: Int!
  Official_ID: Int!
}

type Resource_PoliticalEvent {
  ID: Int!
  Resource_ID: Int!
  PoliticalEvent_ID: Int!
}

type Resource_Issue {
  ID: Int!
  Resource_ID: Int!
  Issue_ID: Int!
}

type LookupItem {
  ID: Int!
  Lookup_ID: Int!
  LookupItemDefinition: String!
  LookupItemName: String!
  DisplayName: String!
  LookupItemDescription: String!
}

type Lookup {
  ID: Int!
  LookupName: String!
  DisplayName: String!
  LookupDescription: String!
}

`];

export const resolvers = {
};
