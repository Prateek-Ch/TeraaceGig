var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Attribute = require('../models/attributes');
var Cart = require('../models/cart');

router.get('/:productId',function(req,res){
    const requestedProductId = req.params.productId;
    Product.findOne({_id: requestedProductId},function(err,product){
        Attribute.find({pid: product.pid},function(err,attr){
            if(!req.session.cart){
                return res.render("productDetail", {cart_products: null,_id:product._id,title: product.title,description: product.description,
                    category:product.category,
                    price: product.price,
                    img: product.img,
                    attr: attr,
            })
        }
            var cart = new Cart(req.session.cart);
            res.render("productDetail", {cart_products: cart.generateArray(),totalPrice: cart.totalPrice,_id:product._id,title: product.title,description: product.description,
            category:product.category,
            price: product.price,
            img: product.img,
            attr: attr,
            });
        });
        
        });
    });


router.get('/add-to-cart/:id',function(req,res){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId, function(err,product){
        if(err){
            console.log(err);
            res.redirect('/');
        }
        else{
            cart.add(product,product.id);
            req.session.cart = cart;
            res.redirect('/allproducts');
        }
    });
});


router.get('/reduce/:id',function(req,res){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
  
    cart.reduceOne(productId);
    req.session.cart = cart;
    res.redirect('/allproducts');
  })
  
router.get('/removeAll/:id',function(req,res){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
  
    cart.removeAll(productId);
    req.session.cart = cart;
    res.redirect('/allproducts');
})
  


module.exports = router; 