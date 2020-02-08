var mongoose = require("mongoose");
const postmodel = require("../model/post");
const { check, validationResult } = require("express-validator");


module.exports.getpostby = function (req, res) {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    
      var Post = mongoose.model("POST", postmodel.posts);

    var title = req.body.title;
    console.log(req.body);

      Post.findOne({ "title": title }, function (err, resp) {
        if (!err) {
          res.send(resp);
        }
      });
  }
}
