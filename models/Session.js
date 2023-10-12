const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        unique: true
      },
    username: {
        type: String,
        required: true,
    },
  name: {
    type: String,
    required: true,
  },
  sessionname: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
});

const Session = mongoose.model("Session", SessionSchema);

module.exports = Session;
