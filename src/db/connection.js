
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/forum", { useNewUrlParser: true });

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("connected")
// });



module.exports.connect= db;