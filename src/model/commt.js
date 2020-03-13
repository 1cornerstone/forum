const mongoose = require("mongoose");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

const posts = new mongoose.Schema({
  
  name: String, // username of the person post the content
  content: String, // content of the post
  post_date: { type: Date, default: Date.now }, // stamp with date
  imagepath: Array, // image(s) added
  likes: Array // username of those that viewed it
});

posts.plugin(beautifyUnique);

module.exports.posts = posts;



// update part