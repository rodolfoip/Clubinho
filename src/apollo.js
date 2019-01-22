import {makeExecutableSchema} from 'graphql-tools'
import * as event_bd from "./bd/event";
import * as user_bd from "./bd/user";

const typeDefs = `
  type Event { _id: String, local: String!, userId: String! }
  type User { _id: String, name: String! }
  type Query { 
    allEvents: [Event], 
    eventById(_id: ID!): Event, 
    eventByLocal(local: String!): Event,
    eventsByUser(userId: String!): [Event],
    allUsers: [User], 
    userById(_id: ID!): User, 
    userByName(name: String!): User
  }
  type Mutation {
    registerEvent (local: String!, userId: String!): Event,
    updateEvent (_id: ID!, local: String!, userId: String!): Event,
    deleteEventById ( _id: ID! ): Boolean,
    registerUser (name: String!): User,
    updateUser (_id: ID!, name: String!): User,
    deleteUserById (_id: ID!): Boolean
  }
`

const resolvers = {
  Query: {
    allEvents: () => event_bd.searchAllEvents(),
    eventById: (root, {_id}) => event_bd.searchEventById(_id),
    eventByLocal: (root, {local}) => event_bd.searchEventByLocal({local}),
    eventsByUser: (root, {userId}) => event_bd.searchEventsByUser({userId}),
    allUsers: () => user_bd.searchAllUsers(),
    userById: (root, {_id}) => user_bd.searchUserById(_id),
    userByName: (root, {name}) => user_bd.searchUserByName({name})
  },
  Mutation: {
    registerEvent: (root, event) => event_bd.registerEvent(event),
    updateEvent: (root, event) => event_bd.updateEvent(event),
    deleteEventById: (root, {_id}) => event_bd.deleteEventById(_id),
    registerUser: (root, user) => user_bd.registerUser(user),
    updateUser: (root, user) => user_bd.updateUser(user),
    deleteUserById: (root, {_id}) => user_bd.deleteUserById(_id),
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
