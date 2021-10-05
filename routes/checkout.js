var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');

router.get('/', function(req,res){
    if(!req.session.cart){
      return res.redirect('/');
    }
    var cart = new Cart(req.session.cart);
    res.render('checkout',{products: cart.generateArray(), totalPrice: cart.totalPrice});
});

module.exports = router;