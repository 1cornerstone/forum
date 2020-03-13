const User = require("../model/Users").User,
   userModel = require("../model/user"),
    auth = require('../middlewares/auth');


const profile = async (req, res)=> {


  if (req.param.token === null || undefined) return res.send('unAuthorized'); // if user didnt provide token this will reject his request

  let username = await auth.getSession(req.params.token).catch(err=>{});  // get user username with his token

  if (username === null || undefined) return res.send('unAuthorized'); // if null token have expired or not valid

  User.findOne({ "username": username }, function(err, payload) {
    if (!err) {
      let user = new userModel(
        payload.name,
       payload.username,
       payload.email
      );
      res.json(user);
    }
  });
};

module.exports= profile;


