
const mongoose = require("mongoose");
mongoose.connect("mongodb://mongo:27017/forum", { useNewUrlParser: true });

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("DB connected")
});


module.exports.connect= db;