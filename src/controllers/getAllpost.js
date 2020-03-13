const mongoose = require("mongoose"),
 postmodel = require("../model/post");

 const getpost = function (req, res) {

    let Post = mongoose.model("POST", postmodel.posts);
    Post.find({}).sort({ "post_date": -1 }).exec(function (err, resp) {
        if (!err) return res.json(resp)
    });
};

module.exports = getpost;
