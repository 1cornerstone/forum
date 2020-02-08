
var mongoose = require("mongoose");
const postmodel = require("../model/post");
const { check, validationResult } = require("express-validator");


module.exports.postcomment = function (req, res) {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {

        var topic = req.body.title;
        var comment = req.body.comment;

        var post = mongoose.model("POST", postmodel.posts);

        post.update({ title: topic },
            {
                $addToSet: {
                    "comment": comment
                }
            }, function (err, response) {

                if (!err) {
                    res.send(response)
                }
            })
     }
}
