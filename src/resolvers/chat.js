const { Post } = require("../models");

const chat = async (_, { userId }) => {
  if (userId) {
    const posts = await Post.find({
      $or: [{ fromUser: userId }, { toUser: userId }],
    })
      .populate("fromUser")
      .populate("toUser");
    return posts;
  }

  const posts = await Post.find({}).populate("fromUser").populate("toUser");
  return posts;
};

module.exports = chat;
