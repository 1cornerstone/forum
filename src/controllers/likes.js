var mongoose = require("mongoose");
const postmodel = require("../model/post");

var session;

module.exports.like = function (req, res) {
  
  session = req.session;
  console.log(session.id);
  console.log(session.username);

  var topic = req.body.title;
  var username = session.username;

  var post = mongoose.model("POST", postmodel.posts);

  post.updateOne(
    { title: topic },
    {
      $addToSet: {
        likes: username
      }
    },
    function(err, response) {
      if (!err) {
        res.send("Liked");
      }
    }
  );
};

module.exports.mylikes = function (req, res) {
  
  session = req.session;
  console.log(session.id);
  console.log(session.username);

  var Post = mongoose.model("POST", postmodel.posts);
  
   var username = session.username;

   Post.find({ likes: username }, function(err, resp) {
     if (!err) {
       res.send(resp);
     }
   });


}