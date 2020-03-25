const {check, validationResult} = require("express-validator"),
    posts = require("../model/post"),
    auth = require('../middlewares/auth');


module.exports.post = async  (req, res) =>{

    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(422).json({errors: errors.array()});

    let username = await auth.getSession(req.body.token).catch(err=>{});  // get user username with his token

    if (username === null || undefined) return res.send('unAuthorized'); // if null token have expired or not valid

        let post = await new posts({
            title: req.body.title,
            authorname: username, // username of the person post the content
            content: req.body.content, // content of the post
          post_type: req.body.category, //category of the post
        });

      await post.save(function (err, resp) {
            if (err) return res.send("Title already exist");
              return res.send({
                  state:'success',
                  postID: resp._id
              })
        });

};

