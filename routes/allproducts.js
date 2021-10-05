var express = require('express');
var router = express.Router();

var Product = require('../models/product');
var Cart = require('../models/cart');

router.get('/',function(req,res){
    Product.find({},function(err,datas){
      var productChunks = [];
      for (var i=0; i<datas.length;i+=3){
        productChunks.push(datas.slice(i,i+3));
      }
      if(!req.session.cart){
        return res.render('allproducts',{datas: productChunks, cart_products: null});
      }
        var cart = new Cart(req.session.cart);
        res.render('allproducts',{datas: productChunks, cart_products: cart.generateArray(),totalPrice: cart.totalPrice});
      });
});
  
module.exports = router;