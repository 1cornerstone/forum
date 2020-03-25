const mongoose = require("mongoose"),
 posts = require("../model/post");

 const getpost = function (req, res) {

    posts.find({}).sort({ "post_date": -1 }).exec(function (err, resp) {
        if (!err) return res.json(resp)
    });

};

module.exports = getpost;
