var express = require("express");
var body_p = require("body-parser");
var helmet = require("helmet");
var validator = require("./src/util/Validator");
const { check, validationResult } = require("express-validator");
const file_upload = require("express-fileupload");


const userlogin = require("./src/controllers/userlogin");
const usersign = require("./src/controllers/usersignup");
const user_retrievepassword = require("./src/controllers/retrievepassword");
const sess = require("express-session");
const postcontent = require("./src/controllers/postcontent");
const postfile = require("./src/controllers/postfile");
const getAllpost = require("./src/controllers/getAllpost");
const getpostbytitle = require("./src/controllers/getpostbytitle");
const comment = require("./src/controllers/comment");
const likes = require("./src/controllers/likes");
const posts = require("./src/controllers/mypost");
const filter = require("./src/controllers/filter");
const changeroute = require("./src/controllers/changepassword");
const account= require("./src/controllers/profile");
var db = require("./src/db/connection");


var app = express();

app.use(body_p.urlencoded({ extended: true }));
app.use(body_p.json());
app.use(
  sess({
    secret: "cornerstone",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false}
  })
);
 
app.use(helmet());
app.use(check());
app.use(
  file_upload({  })
);


app.get("/", getAllpost.getpost);

app.post("/login", validator.checkuserlog, userlogin.login);

app.post("/signup", validator.checkusersign, usersign.sign);

app.post("/profile",account.profile);

app.post("/retrivepassword", validator.retrieve, user_retrievepassword.passkey);

app.post("/verifypincode", validator.verifycode, user_retrievepassword.verifypin); // not finished

app.get("/getpost", getAllpost.getpost);

app.post("/postcontent", validator.validedatepost, postcontent.post);

app.post("/postfile", postfile.file);

app.get("/postfilter", validator.filter, filter.postfilter);

app.get("/getbytitle", validator.validatetitle, getpostbytitle.getpostby);

app.post("/comment", validator.comment, comment.postcomment);

app.post("/likes", likes.like);

app.post("/mylikes", likes.mylikes);

app.post("/myposts", posts.mypost);

app.post("/deletepost", validator.validatetitle, postcontent.deletepost);

app.post('/changepassword', validator.changePasskey, changeroute.changepassword);

app.listen(3020, () => {  console.log(" listening") });
