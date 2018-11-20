import {makeExecutableSchema} from 'graphql-tools'
import * as BD from "./BD";

const typeDefs = `
  type Query { events: [Event], eventById(_id: ID!): Event, eventByLocal(local: String!): Event}
  type Event { _id: String, local: String, author: String }
  type Mutation {
    registerEvent (local: String!, author: String!): Event,
    updateEvent (_id:ID!, local: String, author: String): Event
  }
`

const resolvers = {
  Query: {
    events: () => BD.searchAllEvent(),
    eventById: (root, _id) => BD.searchEventById(_id),
    eventByLocal: (root, {local}) => BD.searchEventByLocal({local})
  },
  Mutation: {
    registerEvent: (root, {local, author}) => BD.registerEvent({local, author}),
    updateEvent: (root, {_id, local, author}) => BD.updateEvent(_id, {local, author})
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
