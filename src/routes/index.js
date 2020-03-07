
 const app =  require('express').Router(),
     validator = require("../util/Validator");


 app.post("/login", validator.checkuserlog, require('../controllers/userlogin').login);

 app.post("/signup", validator.checkusersign, require('../controllers/usersignup').sign);

 app.post("/profile",require('../controllers/profile').profile);

 app.post("/retrivepassword", validator.retrieve, require('../controllers/retrievepassword').passkey);

 app.post("/verifypincode", validator.verifycode, require('../controllers/retrievepassword').verifypin); // not finished

 app.get("/getpost", require('../controllers/getAllpost').getpost);

 app.post("/postcontent", validator.validedatepost, require('../controllers/postcontent').post);

 app.post("/postfile", require('../controllers/postfile').file);

 app.get("/postfilter", validator.filter, require('../controllers/filter').postfilter);

 app.get("/getbytitle", validator.validatetitle, require('../controllers/getpostbytitle').getpostby);

 app.post("/comment", validator.comment, require('../controllers/comment').postcomment);

 app.post("/likes", require('../controllers/likes').like);

 app.post("/mylikes", require('../controllers/likes').mylikes);

 app.post("/myposts", require('../controllers/mypost').mypost);

 app.post("/deletepost", validator.validatetitle, require('../controllers/postcontent').deletepost);

 app.post('/changepassword', validator.changePasskey, require('../controllers/changepassword').changepassword);


module.exports = app;