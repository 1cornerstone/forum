const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const beautifyUnique = require("mongoose-beautiful-unique-validation");
var encryptor = require("../util/encryptor");

module.exports.sign = function (req, res) {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    //my util to encrypt password
    encryptor.cryptpassword(req.body.password, function(err, key) {
      var mName = req.body.name;
      var mEmail = req.body.email;
      var mUsername = req.body.username;

      var Person = mongoose.model("Users", User);

      const person = new Person({
        name: mName,
        username: mUsername,
        email: mEmail,
        password: key
      });

      person.save(function(err) {
        if (err) {

          console.log(err + "  "+person.username)
          var error = err.errors;
          var key = Object.keys(error);

          if (key == "username") {
            res.send("Username Already Exist.");
          } else if (key == "email") {
            res.send("Email Already Exist.");
          }
        } else {
          req.session.username = req.body.username;
          res.send("_inserted");
        }
      });
    });
  }
};

// db schema
var User = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
});

User.plugin(beautifyUnique);

module.exports.User = User;
