require('dotenv').config();

var express = require('express');
var router = express.Router();
const Razorpay = require('razorpay');

var Cart = require('../models/cart');
var Order = require('../models/order');

router.get('/', function(req,res){
    if(!req.session.cart){
      return res.redirect('/');
    }
    var cart = new Cart(req.session.cart);
    res.render('checkout',{products: cart.generateArray(), totalPrice: cart.totalPrice});
});


router.post('/charge',function(req,res){
  const razorpay = new Razorpay({
    key_id:process.env.RAZORPAY_KEY,
    key_secret:process.env.RAZORPAY_SECRET
});

const options = {
    amount: req.session.cart.totalPrice * 100,
    currency: 'INR',
}
razorpay.orders.create(options, function(err, order){   
    console.log('From razorpay.orders.create to send orderid back');
    console.log(order);
    res.send({orderID: order.id});
})

});

router.post('/order',function(req,res){
  if (!req.session.cart) {
    return res.redirect('/');
}
var cart = new Cart(req.session.cart ? req.session.cart : {});
const amount = cart.totalPrice*100;

console.log("Body",req.body);

        var order = new Order({
          cart: cart,
          phone:req.body.phone,
          address: req.body.address,
          address_two:req.body.address_two,
          zip: req.body.zip,
          email: req.body.email,
          name: req.body.name,
         });
         order.save(function(err,result){
            if(err) console.log(err);
         });
        req.session.cart = null;
   
   });
   


module.exports = router;