
const { check, validationResult } = require("express-validator");

exports.checkuserlog = [
    check('email').not().isEmpty().withMessage("Username is  empty"),
    check('email').isLength({ min: 5 }).withMessage("username too short minimum 5"),
    check('email').not().isNumeric().withMessage("Username cannnot be Number"),
    check('password').not().isEmpty().withMessage("Password is  empty"),
    check('password').isLength({ min: 5 }).withMessage("Password too short minimum 5")
];


exports.checkusersign =[

    //  validate data 
    check('name').not().isEmpty().withMessage("name is  empty"),
    check('name').isLength({ min: 5 }).withMessage("name too short minimum 5"),
    check('name').not().isNumeric().withMessage("name can not be Number."),

    check('email').not().isEmpty().withMessage("Email is empty"),
    check('email').isEmail().withMessage("Invalid Email"),
    check('email').isLength({min: 5}).withMessage("Email too short, < 5"),

    check('username').not().isEmpty().withMessage("Username is  empty"),
    check('username').isLength({ min: 5 }).withMessage("username too short minimum 5"),
    check('username').not().isNumeric().withMessage("Username can not be Number."),

    check('password').not().isEmpty().withMessage("Password is  empty"),
    check('password').not().isNumeric().withMessage("Password can not be Number."),
    check('password').isLength({ min: 5 }).withMessage("Password too short minimum of 5")

];

module.exports.retrieve = [
    check('email').isEmail().withMessage("invalid Email")
]

module.exports.verifycode = [
    check('pin').isNumeric().withMessage("Enter Number")
]

module.exports.validedatepost = [

    check('title').not().isEmpty().withMessage("Title of the Post empty."),
    check('title').not().isNumeric().withMessage("Numbers Can`t be title. "),
    check('title').isLength({ min: 10 }).withMessage("Post title too short < 4"),
    check('content').not().isEmpty().withMessage("Post Content is empty."),
    check('content').isLength({ min: 10 }).withMessage("Post title too short < 10"),
    check('category').not().isEmpty().withMessage("Post Category Empty."),
    check('token').not().isEmpty().withMessage("token is empty")

];

module.exports.comment = [
     check("postID").not().isEmpty().withMessage("PostID cannot be empty"),
    check("token").not().isEmpty().withMessage("Token cannot be empty"),
    check("comment").not().isEmpty().withMessage("comment cannot be empty")
];

module.exports.likes = [
     check("postID").not().isEmpty().withMessage("PostID cannot be empty"),
    check("token").not().isEmpty().withMessage("Token cannot be empty"),
];


module.exports.deletepost = [
     check("token").not().isEmpty().withMessage("Token cannot be empty"),
      check("postID").not().isEmpty().withMessage("PostID cannot be empty")
];


module.exports.changePasskey = [
    check("token").not().isEmpty().withMessage("Token cannot be empty"),
    check('password').not().isEmpty().withMessage("New Password cannot Empty"),
    check('password').isLength({min:4}).withMessage("New Password length is must greater than "),
     check('newPassword').not().isEmpty().withMessage("Confirm Password  cannot Empty"),
]