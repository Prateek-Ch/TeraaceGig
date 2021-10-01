require('dotenv').config();

var express = require('express');
var router = express.Router();
var Product = require('../models/product');

const Razorpay = require('razorpay');


// TO GET About PAGE (this or app)
router.get('/',function(req,res){
    res.render('landing');
})

// router.post('/order',function(req,res){
//     const razorpay = new Razorpay({
//         key_id:process.env.RAZORPAY_KEY,
//         key_secret:process.env.RAZORPAY_SECRET
//     });
    
//     const options = {
//         amount: 1000,
//         currency: 'INR',
//     }
//     razorpay.orders.create(options, function(err, order){   
//         console.log('From razorpay.orders.create to send orderid back');
//         console.log(order);
//         res.send({orderID: order.id});
//     })
// });

module.exports = router;
