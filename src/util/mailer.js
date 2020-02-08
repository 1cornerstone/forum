var nodemailer = require("nodemailer");
var gpc = require("generate-pincode");


var mailing = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service:"gmail.com",
  port: 587,
  auth: {
    user: "akintundeayofesegun@gmail.com",
    pass: ""
  }
});

//generate Pin to send to the User
var pin = gpc(6);

var mailOptions = {
  from: "forum@admin.com",
  to: "recipientemail@gmail",
  subject: "Forum Password Forgotten ",
  text: "Your password reset pin is "+ pin
};

module.exports.sendmail = function(callback) {
  
  mailing.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      callback(null, pin);
    }
  });
};
