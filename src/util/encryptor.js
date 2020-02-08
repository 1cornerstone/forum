const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.cryptpassword = function(userpassword, callback) {
  bcrypt.hash(userpassword, saltRounds, function(err, hash) {
    return callback(null, hash);
  });
};

module.exports.checkpassword = function(password, hash, callback) {
  bcrypt.compare(password, hash, function(err, res) {
     return callback(null,res)
  });

};
