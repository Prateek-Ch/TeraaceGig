var express = require('express');
var router = express.Router();

//IMAGE UPLOAD PART1 STARTS
var multer = require("multer");
var fs = require("fs");
var path = require("path");

const {uploadFile} = require('../S3');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "routes/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });
var imgModel = require("../models/product");
var attrModel = require('../models/attributes');
router.get('/',function(req,res){
    res.render('upload');
})

router.get('/attr',function(req,res){
  res.render('attributes');
})

router.post("/imagehandle", upload.array("image",10), async (req, res) => {
    console.log("Files",req.files);
    const result = await uploadFile(req.files);
    console.log("result",result);
   
    let imageArray = [];
    let key;
    for(let i=0;i<result.length;i++){
      key = result[i].Key;
      imageArray.push(key);
    }
    console.log("Image Array",imageArray);


    var obj = {
      title: req.body.name,
      description: req.body.desc,
      category:req.body.category,
      price: req.body.price,
      pid: req.body.pid,
      img: imageArray
    };
    imgModel.create(obj, (err, item) => {
      if (err) {
        console.log(err);
      } else {
        //item.save();
        res.redirect("/allproducts");
      }
    });
  });
  
  router.post("/attrupload", (req, res, next) => {
    
    var obj = {
      pid: req.body.pid,
      color: req.body.color,
      sizes: req.body.sizes.split(','),
      stockAvail:req.body.count.split(',').map(Number)
    };
    attrModel.create(obj, (err, item) => {
      if (err) {
        console.log(err);
      } else {
        //item.save();
        res.redirect("/allproducts");
      }
    });
  });
  

module.exports = router;