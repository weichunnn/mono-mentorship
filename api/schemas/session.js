const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  time: {
    type: String,
  },
  date: {
    type: String,
  },
  mentee: {
    type: String,
  },
  mentor: {
    type: String,
  },
});

const Session = mongoose.model("Session", SessionSchema);

module.exports = { Session };
