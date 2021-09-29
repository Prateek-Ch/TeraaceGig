require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const cors = require('cors');
const app = express();

// mongoose.connect('mongodb://localhost:27017/terracegig',{ useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var index = require('./routes/index');

app.use(cors({
    origin: '*'
}));

app.use('/',index);


app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  