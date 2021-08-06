const { Schema, model } = require("mongoose");

const schema = new Schema({
  username: {
    required: true,
    type: String,
  },
  session: {
    required: true,
    type: String,
  },
});

module.exports = model("Session", schema);
