const { Schema, model } = require("mongoose");

const schema = {
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
};

const userSchema = new Schema(schema);

const User = model("User", userSchema);

module.exports = User;
