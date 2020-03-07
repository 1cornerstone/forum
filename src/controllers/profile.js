const User = require("../model/Users").User,
   usermodel = require("../model/user");


let session;
const profile = (req, res)=> {
    session = req.session;
  let username = session.username;

  User.findOne({ "username": username }, function(err, userlog) {
    if (!err) {
      let user = new usermodel(
        userlog.name,
        userlog.username,
        userlog.email
      );
      res.json(user);
    }
  });
};

module.exports= profile;


