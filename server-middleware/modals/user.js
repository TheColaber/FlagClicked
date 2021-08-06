const { Schema, model } = require("mongoose");

const schema = new Schema({
  id: {
    required: true,
    type: Number
  },
  username: {
    required: true,
    type: String
  },
  admin: {
    required: false,
    type: Boolean
  }
});

module.exports = model("User", schema);
