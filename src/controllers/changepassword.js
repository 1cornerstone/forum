
var mongoose = require("mongoose");
const postmodel = require("../model/post");
const { check, validationResult } = require("express-validator");



module.exports.changepassword = function (req, res) {
    
     const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {

        var pass1 = req.body.password;
        var pass2 = req.body.newpassword;
        if (pass1.toString().trim() == pass2.toString().trim()) {
            res.send("yes")
        } else {
         res.send("no");
        }
               
}


}
