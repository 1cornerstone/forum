var mongoose = require("mongoose");
const User = require("../model/Users").User;
var usermodel = require("../model/user");


var session;
module.exports.profile = function(req, res) {
    session = req.session;
  var username = session.username;

  User.findOne({ "username": username }, function(err, userlog) {
    if (!err) {
      var user = new usermodel(
        userlog.name,
        userlog.username,
        userlog.email
      );
      res.json(user);
    }
  });
};


