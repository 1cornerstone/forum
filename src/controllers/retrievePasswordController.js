const {check, validationResult} = require("express-validator"),
    User = require("../model/Users").User,
    sendmail = require("../util/mailer"),
    encryptor = require("../util/encryptor");


//send code to mail 
module.exports.passkey = function (req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({errors: errors.array()});

    let userEmail = req.body.email;

    User.findOne({email: userEmail}, function (err, userlog) {
        if (!err) {
            if (userlog == null) return res.send("Thanks, we will verify if this is the email you registered with");

            sendmail(function (err, pin) {
                //save the pin for accessing.
                User.update({email: userEmail}, {
                        "misc": {
                            "retrieveID": pin
                        }
                },(err,resp)=>{
                    if (!err) return res.send("Kindly Check your email, Token have been sent to your email."+ pin)
                });
            });
        }
    })

};

module.exports.verifypin = function (req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({errors: errors.array()});

    User.findOne({email: req.body.email}, function (err, user) {
        if (!err) {

            if ( user.misc[0].retrieveID !== req.body.pin) return res.send("Invalid token used");

            encryptor.cryptpassword(req.body.newPassword, function(err, key) {
                User.updateOne({'email': req.body.email}, {
                    "password": key,
                    "misc": {
                        "retrieveID": "null"
                    }
                },function (err, response) {
                    if (!err) return   res.send("Password Changed");
                    return res.send("Password not Changed");
                })
            })
        }
    })
    //566757

    //return res.send("Incorrect Code Entered. " + storepin)


};


