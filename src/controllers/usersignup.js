const { check, validationResult } = require("express-validator"),
    mongoose = require("mongoose"),
    beautifyUnique = require("mongoose-beautiful-unique-validation"),
    encryptor = require("../util/encryptor");

const sign = (req, res) =>{
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    //my util to encrypt password
    encryptor.cryptpassword(req.body.password, function(err, key) {
      let mName = req.body.name;
      let mEmail = req.body.email;
      let mUsername = req.body.username;

      let Person = mongoose.model("Users", User);

      const person = new Person({
        name: mName,
        username: mUsername,
        email: mEmail,
        password: key
      });

      person.save(function(err) {
        if (err) {
          let error = err.errors;
         let key = Object.keys(error);

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
const User = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
});

User.plugin(beautifyUnique);

module.exports.User = User;
module.exports.sign = sign;
