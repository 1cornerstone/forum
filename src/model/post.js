const mongoose = require("mongoose");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

const Posts = new mongoose.Schema({
  title: { type: String, unique: true }, // title of the post
  authorname: String, // username of the person post the content
  content: String, // content of the post
  comment: Array, // to list all comment
  comment_count: { type: Number, default: 0 }, // number of the comment
  post_type: String, //category of the post
  post_date: { type: Date, default: Date.now }, // stamp with date
  imagepath: Array, // image(s) added
  likes: Array // username of those that viewed it
});

Posts.plugin(beautifyUnique);

 const post =  mongoose.model("POST", Posts);
module.exports = post;
