
 const app =  require('express').Router(),
     validator = require("../util/Validator");

 app.get('/',(req,res)=>{res.send('working')});

 app.post("/login", validator.checkuserlog, require('../controllers/userLoginController'));

 app.post("/signup", validator.checkusersign, require('../controllers/userSignUpController').sign);

 app.get("/profile/:token",require('../controllers/profileController'));

 app.post("/postcontent", validator.validedatepost, require('../controllers/postContentController').post);

 app.get("/getposts", require('../controllers/getAllPostController'));

 app.get("/postfilter/:category",require('../controllers/filterController').postfilter);

 app.get("/getbytitle/:title", require('../controllers/getPostByTitleController').getpostby);

 app.get("/myposts/:token", require('../controllers/myPostController').mypost);

 app.post("/deletepost", require('../controllers/deletePostController').deletepost);

 app.post("/comment", validator.comment, require('../controllers/commentController').postcomment);

 app.post("/likes",validator.likes, require('../controllers/likesController').like);

 app.get("/mylikes/:token", require('../controllers/likesController').mylikes);

 app.post('/changepassword', validator.changePasskey, require('../controllers/changePasswordController').changepassword);

 app.get('/logout/:token',require('../controllers/logoutController'));

 app.get('/delAccount/:token',require('../controllers/delAccountController'));



 //not updated
 app.post("/retrivepassword", validator.retrieve, require('../controllers/retrievePasswordController').passkey);

 app.post("/verifypincode", validator.verifycode, require('../controllers/retrievePasswordController').verifypin); // not finished

 app.post("/postfile", require('../controllers/postFileController').file);


module.exports = app;