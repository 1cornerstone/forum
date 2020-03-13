
 const app =  require('express').Router(),
     validator = require("../util/Validator");

 app.get('/',(req,res)=>{res.send('working')});

 app.post("/login", validator.checkuserlog, require('../controllers/userlogin'));

 app.post("/signup", validator.checkusersign, require('../controllers/usersignup').sign);

 app.get("/profile/:token",require('../controllers/profile'));

 app.post("/postcontent", validator.validedatepost, require('../controllers/postcontent').post);

 app.get("/getposts", require('../controllers/getAllpost'));

 app.get("/postfilter/:category",require('../controllers/filter').postfilter);

 app.get("/getbytitle/:title", require('../controllers/getpostbytitle').getpostby);

 app.get("/myposts/:token", require('../controllers/mypost').mypost);

 app.post("/deletepost", require('../controllers/deletepost').deletepost);

 app.post("/comment", validator.comment, require('../controllers/comment').postcomment);

 app.post("/likes",validator.likes, require('../controllers/likes').like);

 app.get("/mylikes/:token", require('../controllers/likes').mylikes);

 app.post('/changepassword', validator.changePasskey, require('../controllers/changepassword').changepassword);



 //not updated
 app.post("/retrivepassword", validator.retrieve, require('../controllers/retrievepassword').passkey);

 app.post("/verifypincode", validator.verifycode, require('../controllers/retrievepassword').verifypin); // not finished

 app.post("/postfile", require('../controllers/postfile').file);






module.exports = app;