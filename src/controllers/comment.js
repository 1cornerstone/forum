
const mongoose = require("mongoose"),
    postmodel = require("../model/post"),
    { check, validationResult } = require("express-validator"),
    auth = require('../middlewares/auth');


module.exports.postcomment = async (req, res)=> {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {

        if (req.body.token === null || undefined) return res.send('unAuthorized');

        let username = await auth.getSession(req.body.token).catch(err=>{});

        if (username === null || undefined) return res.send('unAuthorized');

        let postID = req.body.postID;
        let comment = req.body.comment;

        let commentObj = {
         "name": username,
            "comment":comment,
            "date":Date.now()
        };

        let post = mongoose.model("POST", postmodel.posts);
        post.update({ _id: postID },
            {
                $addToSet: {
                    "comment": commentObj
                },
                $inc: {"comment_count":1}
            }, function (err, response) {
                if (!err) return res.send("commented")
            })
     }
};
