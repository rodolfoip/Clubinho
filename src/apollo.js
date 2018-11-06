import {makeExecutableSchema} from 'graphql-tools'
import {registerEvent, searchAllEvent, searchEventById, searchEventByLocal} from "./BD";

const typeDefs = `
  type Query { events: [Event], event(_id: ID!): Event, eventByLocal(local: String!): Event}
  type Event { local: String, author: String }
  type Mutation {
    registerEvent (local: String!, author: String!): Boolean
  }
`

const resolvers = {
  Query: {
    events: () => searchAllEvent(),
    event: (root, _id) => searchEventById(_id),
    eventByLocal: (root, {local}) => searchEventByLocal({local})
  },
  Mutation: {
    registerEvent: (root, event) => registerEvent(event)
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
