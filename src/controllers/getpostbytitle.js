const mongoose = require("mongoose"),
 postmodel = require("../model/post");

module.exports.getpostby = function (req, res) {

  let Post = mongoose.model("POST", postmodel.posts);
  let title = req.params.title;

  if (title === null || undefined) return res.send('title missing');

  Post.findOne({ "title": title }, function (err, resp) {
    if (!err) {
      res.send(resp);
    }
  });
};
