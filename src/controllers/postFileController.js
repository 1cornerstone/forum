const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const postmodel = require("../model/post");

let filesize = 12 * 1024 * 1024;
let newN = "";

let session;
module.exports.file = function (req, res) {

  session = req.session;

 let username = session.username;

  if (Object.keys(req.files).length == 0 ) {
    res.status(400).send("No files were uploaded.");
  } else {
    let files = req.files.attach;

    for (let i = 0; i < files.length; i++) {
      let ext = path.extname(files[i].name);
      //   const id = crypto.randomBytes(16).toString("hex");
      let newfilename = username + files[i].name;
      files[i].name = newfilename;
      newN = files[i].name;

      if (files[i].size <= filesize) {
        storetodatabase(newN, files[i].data);

        if (i == files.length - 1) {
          res.send("Done");
        }
      }
    }
  }
};

function storetodatabase(value, data) {

  let id = "5d38f28bfff3a40bdc410ea4";
    //session.post_id;

  let post = mongoose.model("POST",postmodel.posts);
  
  post.update(
    { _id: id },
    {
      $addToSet: {
        imagepath: value
      }
    },
    function(err, response) {
      if (!err) {
        fs.writeFile("src/images/" + value, data, function(err) {
          if (err) return console.log(err);
        });
      }
    }
  );
}
