import {makeExecutableSchema} from 'graphql-tools'
import * as BD from "./BD";

const typeDefs = `
  type Query { allEvents: [Event], eventById(_id: ID!): Event, eventByLocal(local: String!): Event}
  type Event { _id: String, local: String, author: String }
  type Mutation {
    registerEvent (local: String!, author: String!): Event,
    updateEvent (_id: ID!, local: String!, author: String!): Event,
    deleteEventById (_id: ID!): Boolean
  }
`

const resolvers = {
  Query: {
    allEvents: () => BD.searchAllEvent(),
    eventById: (root, {_id}) => BD.searchEventById(_id),
    eventByLocal: (root, {local}) => BD.searchEventByLocal({local})
  },
  Mutation: {
    registerEvent: (root, event) => BD.registerEvent(event),
    updateEvent: (root, event) => BD.updateEvent(event),
    deleteEventById: (root, {_id}) => BD.deleteEventById(_id)
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
