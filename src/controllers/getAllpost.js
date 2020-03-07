const mongoose = require("mongoose");
const postmodel = require("../model/post");

let session;
 const getpost = function (req, res) {

    session = req.session;
    
    let Post = mongoose.model("POST", postmodel.posts);
    
    Post.find({}).sort({ "post_date": -1 }).exec(function (err, resp) {
        if (!err) return res.json(resp)
    });
};

module.exports = getpost;
