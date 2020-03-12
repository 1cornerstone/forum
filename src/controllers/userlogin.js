const {check, validationResult} = require("express-validator"),
    encryptor = require("../util/encryptor"),
    usermodel = require("../model/user"),
    User = require("../model/Users").User;

const login = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    } else {
        let userEmail = req.body.email;
        User.findOne({email: userEmail}, function (err, userlog) {
            if (err) {
                res.send(err);
            } else {
                if (userlog == null) {
                    res.send("User doesn`t not exist");
                } else {
                    //insert into user model
                    let user = new usermodel(
                        userlog.name,
                        userlog.username,
                        userlog.email
                    );
                    encryptor.checkpassword(req.body.password, userlog.password, function (err, callback) {
                        if (callback === true) {

                            res.send("password correct ");
                        } else {
                            res.send("Password not correct" + callback);
                        }
                    });
                }
            }
        });
    }
};

module.exports = login;
