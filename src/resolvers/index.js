const chat = require("./chat");
const { createPost, postCreated } = require("./post");

const resolvers = {
  Query: {
    chat,
  },
  Mutation: {
    createPost,
  },
  Subscription: {
    postCreated: {
      subscribe: postCreated,
    },
  },
};

module.exports = resolvers;
