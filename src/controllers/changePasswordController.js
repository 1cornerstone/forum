const
    User = require("../model/Users").User,
    encryptor = require("../util/encryptor"),
    auth = require('../middlewares/auth'),
    {check, validationResult} = require("express-validator");


module.exports.changepassword = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(422).json({errors: errors.array()}); // params needed is in the request body

    if (req.body.token === null || undefined) return res.send('unAuthorized');

    let username = await auth.getSession(req.body.token).catch(err => {
    });

    if (username === null || undefined) return res.send('unAuthorized');

    // check if input password is correct
     User.findOne({"username": username}, function (err, payload) {
        if (!err) {
            if (payload == null) return res.send("User does not exist");

            encryptor.checkpassword(req.body.password, payload.password, function (err, callback) {
                if (callback === true) {
                    encryptor.cryptpassword(req.body.newPassword, (err, key) => {
                        User.update({'username': username}, {"password": key},function (err, response) {
                            if (!err) return   res.send("Password Changed");
                            return res.send("Password not Changed");
                        })
                    })
                } else {
                    res.send("Password not correct");
                }
            });
        }
    });

    // if (pass1.toString().trim() == pass2.toString().trim()) {
    //     res.send("yes")
    // } else {
    //  res.send("no");
    // }

}
