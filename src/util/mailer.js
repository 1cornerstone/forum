const nodemailer = require("nodemailer");
const gpc = require("generate-pincode");


const mailing = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure:false,
  requireTLS: true,
  auth: {
    user: "youremail@gmail.com",
    pass: "yourpassword"
  }
});

//generate Pin to send to the User
const pin = gpc(6);

const mailOptions = {
  from: "forum@admin.com",
  to: "usermail@gmail.com",
  subject: "Forum Password Forgotten ",
  text: "Your password reset pin is "+ pin
};

const sendmail = function(callback) {
  
  mailing.sendMail(mailOptions, function(error, info) {
    if (error)  return  console.log(error);
      return  callback(null, pin);
  });
};

module.exports = sendmail;

