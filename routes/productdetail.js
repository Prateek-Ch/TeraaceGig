var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Attribute = require('../models/attributes');

router.get('/:productId',function(req,res){
    const requestedProductId = req.params.productId;

    Product.findOne({_id: requestedProductId},function(err,product){
        Attribute.find({pid: product.pid},function(err,attr){
            console.log(product.pid);
            console.log(attr);
            res.render("productDetail", {
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

module.exports = router; 