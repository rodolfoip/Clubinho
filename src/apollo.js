import {makeExecutableSchema} from 'graphql-tools'
import * as BD from "./BD";

const typeDefs = `
  type Query { allEvents: [Event], eventById(_id: ID!): Event, eventByLocal(local: String!): Event}
  type Event { _id: String, local: String, author: String }
  type Mutation {
    registerEvent (local: String!, author: String!): Event,
    updateEvent (id: ID!, local: String!, author: String!): Event
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
    updateEvent: (root, _id, event) => BD.updateEvent(_id, event)
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
