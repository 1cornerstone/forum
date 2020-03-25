  Forum Api 
 
   **Tools used**
 
  - MongoDB  as data store
  - Redis  as session store
  - Docker
  
  To run this code , make sure Docker is set up on your machine.
    type into your CMD  docker-compose up.
    
    
  Available route
  
    - app.get('/',(req,res)=>{res.send('hello world ')});
     
    - app.post("/login", validator.checkuserlog, require('../controllers/userLoginController'));
     
     - app.post("/signup", validator.checkusersign, require('../controllers/userSignUpController').sign);
     
     - app.get("/profile/:token",require('../controllers/profileController'));
     
     - app.post("/postcontent", validator.validedatepost, require('../controllers/postContentController').post);
     
     -  app.get("/getposts", require('../controllers/getAllPostController'));
     
     - app.get("/postfilter/:category",require('../controllers/filterController').postfilter);
     
     - app.get("/getbytitle/:title", require('../controllers/getPostByTitleController').getpostby);
     
     - app.get("/myposts/:token", require('../controllers/myPostController').mypost);
     
     - app.post("/deletepost", require('../controllers/deletePostController').deletepost);
     
     - app.post("/comment", validator.comment, require('../controllers/commentController').postcomment);
     
     - app.post("/likes",validator.likes, require('../controllers/likesController').like);
     
     - app.get("/mylikes/:token", require('../controllers/likesController').mylikes);
     
     - app.post('/changepassword', validator.changePasskey, require('../controllers/changePasswordController').changepassword);
     
     - app.get('/logout/:token',require('../controllers/logoutController'));
     
     - app.get('/delAccount/:token',require('../controllers/delAccountController'));
     
     - app.post("/retrievePassword", validator.retrieve, require('../controllers/retrievePasswordController').passkey);
     
     - app.post("/verifyPinCode", validator.verifycode, require('../controllers/retrievePasswordController').verifypin);

