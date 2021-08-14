const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
  }

  type Post {
    id: ID!
    fromUser: User!
    toUser: User!
    message: String!
  }

  type Query {
    chat(userId: ID): [Post]
  }

  type Mutation {
    createPost(fromUser: ID!, toUser: ID!, message: String!): Post
  }

  type Subscription {
    postCreated(fromUser: ID!, toUser: ID!): Post
  }
`;

module.exports = typeDefs;
