const mongoose = require("mongoose");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

const User = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  misc: Array //space to add any column
});

User.plugin(beautifyUnique);

const users = mongoose.model("Users", User);
module.exports.User =users;
