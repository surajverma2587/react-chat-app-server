const { PubSub, withFilter } = require("graphql-subscriptions");
const {
  Types: { ObjectId },
} = require("mongoose");

const { Post } = require("../models");

const pubsub = new PubSub();

const createPost = async (_, { fromUser, toUser, message }) => {
  let post = await Post.create({
    fromUser,
    toUser,
    message,
  });

  post = await post.populate("fromUser").populate("toUser").execPopulate();

  pubsub.publish("POST_CREATED", { postCreated: post });

  return post;
};

const postCreated = withFilter(
  () => pubsub.asyncIterator("POST_CREATED"),
  (payload, variables) => {
    // return (
    //   ObjectId(payload.postCreated.fromUser._id).toString() ===
    //     variables.fromUser ||
    //   ObjectId(payload.postCreated.toUser._id).toString() === variables.toUser
    // );
    return true;
  }
);

module.exports = { createPost, postCreated };
