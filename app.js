require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost:27017/terracegig',{ useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var index = require('./routes/index');
var allproducts = require('./routes/allproducts');
var upload = require('./routes/upload');
var productdetail = require('./routes/productdetail');

app.use(cors({
    origin: '*'
}));

app.use('/',index);
app.use('/allproducts',allproducts);
app.use('/upload',upload);
app.use('/productdetail',productdetail);

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  