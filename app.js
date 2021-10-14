require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
var LocalStrategy = require('passport-local');

const cors = require('cors');
const app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');

var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var mongoStore = require('connect-mongo');

mongoose.connect('mongodb://localhost:27017/terracegig',{ useNewUrlParser: true, useUnifiedTopology: true});
require('./config/passport')(passport);


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({secret:'thisissecretaf',
    resave:false,
    saveUninitialized:false,
    store: mongoStore.create({mongoUrl: "mongodb://localhost:27017/terracegig"})
}));

app.use(function(req, res, next) {
    req.session.cookie.maxAge = 180 * 60 * 1000; //Change session expiration milliseconds
     next();
 });


 app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//TO get this login variable to be used in views
app.use(function(req,res,next){
    res.locals.login = req.isAuthenticated();  //Will be either true or false
    res.locals.session = req.session;
    next();
  })
  


var index = require('./routes/index');
var allproducts = require('./routes/allproducts');
var upload = require('./routes/upload');
var productdetail = require('./routes/productdetail');
var checkout = require('./routes/checkout');
var lookbook = require('./routes/lookbook');

//Admin Routes
var adminAddProducts = require('./routes/adminAddProduct');
var adminDashboard = require('./routes/adminDashboard');
var adminLogin = require('./routes/adminLogin');
var adminViewProduct = require('./routes/adminViewProduct');

app.use(cors({origin: '*'}));

app.use('/',index);
app.use('/allproducts',allproducts);
app.use('/upload',upload);
app.use('/productdetail',productdetail);
app.use('/checkout',checkout);
app.use('/lookbook',lookbook);
app.use('/admin/addproduct',adminAddProducts);
app.use('/admin/dashboard',adminDashboard);
app.use('/admin/login',adminLogin);
app.use('/admin/viewproduct',adminViewProduct);


app.listen(3000, function() {
    console.log("Server started on port 3000");
});
  