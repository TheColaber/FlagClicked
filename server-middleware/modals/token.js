const { Schema, model } = require("mongoose");

const schema = new Schema({
  private: {
    required: true,
    type: String
  },
  public: {
    required: true,
    type: String
  }
});

module.exports = model("Token", schema);
