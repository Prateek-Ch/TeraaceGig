var express = require('express');
var router = express.Router();

// TO GET About PAGE (this or app)
router.get('/',isLoggedIn,function(req,res){
    res.render('admin/adminViewProducts');
})

module.exports = router;

function isLoggedIn(req, res, next){
    if(req.user){
      console.log(req.user);
      return next();
    }
    else{
      res.redirect('/admin/login');
    }
}