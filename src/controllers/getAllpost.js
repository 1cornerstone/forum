var mongoose = require("mongoose");
const postmodel = require("../model/post");

var session;
module.exports.getpost = function (req, res) {

    session = req.session;
    console.log(session.id)
    console.log(session.username); 
    
    var Post = mongoose.model("POST", postmodel.posts)
    
    Post.find({}).sort({ "post_date": -1 }).exec(function (err, resp) {

        if (!err) {
            res.json(resp)
        } 
    });
}
