const {check, validationResult} = require("express-validator"),
    encryptor = require("../util/encryptor"),
    User = require("../model/Users").User,
    auth = require('../middlewares/auth');

const login = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    } else {

        User.findOne({username: req.body.username}, function (err, payload) {
            if (!err) {
                if (payload == null) return res.send("User does not exist");

                encryptor.checkpassword(req.body.password, payload.password, function (err, callback) {
                    if (callback === true) {
                        auth.createSession(req.body.username).then(data => {
                            res.send({
                                token: data,
                                access: 'granted'
                            });
                        }).catch(err => {
                            console.log(err)
                        })
                    } else {
                        res.send("Password not correct");
                    }
                });
            }
        });
    }
};

module.exports = login;
