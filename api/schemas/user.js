const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  picture: {
    type: String,
  },
  role: {
    type: String,
    default: "student",
  },
  email: {
    type: String,
  },
  profile: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
