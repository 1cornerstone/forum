var mongoose = require("mongoose");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

var User = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
});

User.plugin(beautifyUnique);

var Person = mongoose.model("User", User);
module.exports.User = Person;
