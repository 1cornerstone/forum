var mongoose = require("mongoose");
const postmodel = require("../model/post");

module.exports.postfilter = function(req, res) {
  var Post = mongoose.model("POST", postmodel.posts);

  var category = req.body.filter;

  Post.findOne({ "post_type": category }, function(err, resp) {
    if (!err) {
      res.send(resp);
    } 
  });
};
