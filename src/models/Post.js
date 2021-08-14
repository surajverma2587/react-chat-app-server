const { Schema, model } = require("mongoose");

const schema = {
  fromUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  toUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
};

const postSchema = new Schema(schema);

const Post = model("Post", postSchema);

module.exports = Post;
