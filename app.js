const express = require("express"),
    body_p = require("body-parser"),
    helmet = require("helmet"),
    {check, validationResult} = require("express-validator"),
    file_upload = require("express-fileupload"),
    sess = require('express-session'),
    cors = require('cors'),
    db = require('./src/db/connection');

const app = express();

app.use(body_p.urlencoded({extended: true}));
app.use(body_p.json());

app.use(
    sess({
        secret: "cornerstone",
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false}
    })
);

app.use(helmet());
app.use(check());
app.use(
    file_upload({})
);
app.use(cors());

app.use('/', require('./src/routes/index'));


app.listen(3020, () => {
    console.log(" server running")
});
