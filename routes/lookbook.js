var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');


// TO GET About PAGE (this or app)
router.get('/',function(req,res){
    if(!req.session.cart){
        return res.render('lookbook',{cart_products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('lookbook',{cart_products: cart.generateArray(),totalPrice: cart.totalPrice});
})

module.exports = router;
