const mongoose = require("mongoose"),
    postmodel = require("../model/post"),
    { check, validationResult } = require("express-validator"),
    auth = require('../middlewares/auth');

module.exports.like = async (req, res) => {

 let errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    if (req.body.token === null || undefined) return res.send('unAuthorized');

    let username = await auth.getSession(req.body.token).catch(err => {});

    if (username === null || undefined) return res.send('unAuthorized');

  let postID = req.body.postID;

  let post = mongoose.model("POST", postmodel.posts);

    post.updateOne({_id: postID},
        {
            $addToSet: {
                likes: username
            },
        },
        function (err, response) {
            if (!err) {
              return   res.send("Liked");
            }
        });
};

module.exports.mylikes = async (req, res)=> {

    if (req.params.token === null || undefined) return res.send('unAuthorized');

    let username = await auth.getSession(req.params.token).catch(err => {});

    if (username === null || undefined) return res.send('unAuthorized');

   let Post = mongoose.model("POST", postmodel.posts);
    Post.find({likes: username}, function (err, resp) {
        if (!err) return res.send(resp);
    });

};