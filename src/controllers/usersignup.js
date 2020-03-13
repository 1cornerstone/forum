const { check, validationResult } = require("express-validator"),
    mongoose = require("mongoose"),
    beautifyUnique = require("mongoose-beautiful-unique-validation"),
    encryptor = require("../util/encryptor"),
    auth = require('../middlewares/auth');


const sign = (req, res) =>{


  const errors = validationResult(req);

  if (!errors.isEmpty()) { return res.status(422).json({ errors: errors.array() });
  } else {
    //encrypt User password
    encryptor.cryptpassword(req.body.password, function(err, key) {

      let Users = mongoose.model("Users",Userschema);

      const user = new Users({
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

// db schema
const Userschema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
});

Userschema.plugin(beautifyUnique);

module.exports.User = Userschema;
module.exports.sign = sign;
