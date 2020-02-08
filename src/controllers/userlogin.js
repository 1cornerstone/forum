const { check, validationResult } = require("express-validator");
var mongoose = require("mongoose");
var encryptor = require("../util/encryptor");
var usermodel = require("../model/user");
const User = require("../model/Users").User;

module.exports.login = function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    var useremail = req.body.email;

    
    User.findOne({ email: useremail }, function(err, userlog) {
      if (err) {
        res.send(err);
      } else {
        if (userlog== null) {
          res.send("User doesn`t not exist");
        } else {
          //insert into user model
          console.log(userlog.username)
          var user = new usermodel(
            userlog.name,
            userlog.username,
            userlog.email
          );

          encryptor.checkpassword(req.body.password, userlog.password, function( err,callback) {
            if (callback == true) {
              req.session.username = user.username;
              res.send("password correct ");
            } else {
              res.send("Password not correct" + callback);
            }
          });
        }
      }
    });
  }
};

