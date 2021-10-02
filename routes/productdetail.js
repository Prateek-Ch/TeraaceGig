var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Attribute = require('../models/attributes');
var Cart = require('../models/cart');

router.get('/:productId',function(req,res){
    const requestedProductId = req.params.productId;

    Product.findOne({_id: requestedProductId},function(err,product){
        Attribute.find({pid: product.pid},function(err,attr){
            res.render("productDetail", {
            _id:product._id,
            title: product.title,
            description: product.description,
            category:product.category,
            price: product.price,
            img: product.img,
            attr: attr,
          });
        });
    })
});


router.get('/add-to-cart/:id',function(req,res){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    console.log(cart);
    Product.findById(productId, function(err,product){
        if(err){
            console.log(err);
            res.redirect('/');
        }
        else{
            cart.add(product,product.id);
            console.log('product',product.id,product.title,product.price,product.category,product.description);
            req.session.cart = cart;
            console.log(req.session.cart);
            res.redirect('/allproducts');
        }
    });
});

module.exports = router; 