const {check, validationResult} = require("express-validator");
const mongoose = require("mongoose");
const beautifyUnique = require("mongoose-beautiful-unique-validation");
const sendmail = require("../util/mailer");

//send code to mail 
module.exports.passkey = function (req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    } else {

        let useremail = req.body.email;
        let Person = mongoose.model("Person", User);
        Person.findOne({email: useremail}, function (err, userlog) {
            if (err) {
                res.send(err);
            } else {
                if (userlog == null) {
                    res.send("Thanks,we will verify if this is the email you registered with.");
                } else {

                    req.session.pin = 0;
                    sendmail.sendmail(function (err, pin) {
                        //save the pin for accessing.
                        req.session.pin = pin;
                        res.send("Kindly Check your email, Token have been sent to your email.")

                    })
                }
            }

        })
    }
};

module.exports.verifypin = function (req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    } else {

        var newpin = req.body.pin;
        var storepin = req.session.pin;

        //566757
        if (storepin == newpin) {
            res.send("correct")
        } else {
            res.send("Incorrect Code Entered. " + storepin)
        }
    }
};


const User = new mongoose.Schema({
    name: String,
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    password: String
});

User.plugin(beautifyUnique);
