var express = require('express');
var router = express.Router();

var Product = require('../models/product');

router.get('/',function(req,res){
    Product.find({},function(err,datas){
      var productChunks = [];
      for (var i=0; i<datas.length;i+=3){
        productChunks.push(datas.slice(i,i+3));
      }
        res.render('allproducts',{datas: productChunks});
      });
});
  
module.exports = router;