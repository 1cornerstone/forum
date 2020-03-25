const post= require("../model/post");

module.exports.getpostby = function (req, res) {

  let title = req.params.title;

  if (title === null || undefined) return res.send('title missing');

  post.findOne({ "title": title }, function (err, resp) {
    if (!err) {
      res.send(resp);
    }
  });
};
