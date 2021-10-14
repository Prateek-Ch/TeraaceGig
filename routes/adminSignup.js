var express = require('express');
var router = express.Router();

var passport = require('passport');
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);



// TO GET About PAGE (this or app)
router.get('/',function(req,res){
    var messages = req.flash('error');
    res.render('admin/signUp',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
})


router.post('/', passport.authenticate('local.signup',{
    successRedirect: "/admin/login",
    failureRedirect: "/admin/signup",
    failureFlash: true
  }));


module.exports = router;
