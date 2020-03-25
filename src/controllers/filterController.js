const Post = require("../model/post");

module.exports.postfilter = function(req, res) {

  let category = req.params.category;

  Post.findOne({ "post_type": category }, function(err, resp) {
    if (!err) {
      res.send(resp);
    } 
  });
};
