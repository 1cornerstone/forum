const mongoose = require("mongoose"),
 postmodel = require("../model/post");

module.exports.postfilter = function(req, res) {
  let Post = mongoose.model("POST", postmodel.posts);

  let category = req.params.category;

  Post.findOne({ "post_type": category }, function(err, resp) {
    if (!err) {
      res.send(resp);
    } 
  });
};
