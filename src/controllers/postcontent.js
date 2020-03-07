const {check, validationResult} = require("express-validator");
const mongoose = require("mongoose");
const beautifyUnique = require("mongoose-beautiful-unique-validation");
const postmodel = require("../model/post");

let session;

module.exports.post = function (req, res) {

    const errors = validationResult(req);

    session = req.session;

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    } else {

        let postModel = mongoose.model("POST", postmodel.posts);

        let post = new postModel({
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
        return res.status(422).json({errors: errors.array()});
    } else {

        let title = req.body.title;
        let post = mongoose.model("POST", postmodel.posts);

        post.remove({"title": title}, function (err) {

            if (!err) return res.send("Removed Successffuly");
            console.log(err)
        })


    }


};
