const mongoose = require("mongoose"),
  postmodel = require("../model/post"),
    auth = require('../middlewares/auth');


module.exports.mypost = async (req, res)=> {

    if (req.param.token === null || undefined) return res.send('unAuthorized'); // if user didnt provide token this will reject his request

    let username = await auth.getSession(req.params.token).catch(err=>{});  // get user username with his token

    if (username === null || undefined) return res.send('unAuthorized'); // if null token have expired or not valid

    let Post = mongoose.model("POST", postmodel.posts);

  Post.find({authorname: username},function(err, resp) {
      if (!err) {
        res.json(resp);
      }
    });
};
