var mongoose = require("mongoose");
const postmodel = require("../model/post");

var session;
module.exports.mypost = function (req, res) {
  
  session = req.session;
  console.log(session.id);
  console.log(session.username);

    var Post = mongoose.model("POST", postmodel.posts);
    
  var username = session.username;

  Post.find({authorname:username},function(err, resp) {
      if (!err) {
        res.json(resp);
      }
    });
};
