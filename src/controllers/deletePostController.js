
const {check, validationResult} = require("express-validator"),
    post = require("../model/post"),
    auth = require('../middlewares/auth');

module.exports.deletepost = async (req, res)=> {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    } else {

        if (req.body.token === null || undefined) return res.send('unAuthorized');

        let username = await auth.getSession(req.body.token).catch(err=>{});

        if (username === null || undefined) return res.send('unAuthorized');

        let postID = req.body.postID;

        post.remove({"_id": postID}, function (err) {
            if (!err) return res.send("Removed Successffuly");
        })


    }


};
