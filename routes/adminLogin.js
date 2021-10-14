var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);


router.get('/',function(req,res,next){
    var messages = req.flash('error');
    res.render('admin/adminLogin',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/', passport.authenticate('local.signin',{
    failureRedirect: "/admin/login",
    failureFlash: true
  }),(req,res)=>{
     res.redirect('/admin/dashboard');
  });


module.exports = router;

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/');
  }
  
  function notLoggedIn(req, res, next){
    if(!req.isAuthenticated()){
      return next();
    }
    res.redirect('/');
  }
  
