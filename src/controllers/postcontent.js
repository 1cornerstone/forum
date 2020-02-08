const { check, validationResult } = require("express-validator");
var mongoose = require("mongoose");
const beautifyUnique = require("mongoose-beautiful-unique-validation");
const postmodel = require("../model/post");

var session;

module.exports.post = function(req, res) {

  const errors = validationResult(req);

  session = req.session;

  console.log(session.id);
  console.log(session.username);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    
    var post =  mongoose.model("POST", postmodel.posts);

    var post = new post({
      title: req.body.title,
      authorname: session.username, // username of the person post the content
      content: req.body.message, // content of the post
      post_type: req.body.category, //category of the post
    });


    post.save(function (err, resp) {
      if (err) {
        res.send("Title already exist");
      } else {
        res.send(resp._id)
      }
    });

  }
};


module.exports.deletepost = function (req, res) {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {


    var title = req.body.title;
     var post = mongoose.model("POST", postmodel.posts);


    post.remove({ "title": title }, function (err) {
      
      if (!err) {
          res.send("Removed Successffuly")
      } else {
        console.log(err)
        }

    })


  }


}
