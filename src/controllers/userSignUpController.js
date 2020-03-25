const { check, validationResult } = require("express-validator"),
    User = require("../model/Users").User,
    encryptor = require("../util/encryptor"),
    auth = require('../middlewares/auth');


const sign = (req, res) =>{


  const errors = validationResult(req);

  if (!errors.isEmpty()) { return res.status(422).json({ errors: errors.array() });
  } else {
    //encrypt User password
    encryptor.cryptpassword(req.body.password, function(err, key) {


      const user = new User({
        name: req.body.name,
        username: req.body.username,
        email:req.body.email,
        password: key
      });

      user.save(function(err) {
        if (err) {
          let error = err.errors;
         let key = Object.keys(error);

          if (key == "username") {
            res.send("Username Already Exist.");
          } else if (key == "email") {
            res.send("Email Already Exist.");
          }
        } else {
          auth.createSession(req.body.username).then(data=>{
            res.send({
              token :data,
              access: 'granted'
            });
          }).catch(err=>{
            console.log(err)
          })
        }
      });

    });
  }
};
module.exports.sign = sign;
