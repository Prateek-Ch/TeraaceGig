var express = require('express');
var router = express.Router();

//IMAGE UPLOAD PART1 STARTS
var multer = require("multer");
var fs = require("fs");
var path = require("path");

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

router.post("/imagehandle", upload.single("image"), (req, res, next) => {
    var obj = {
      title: req.body.name,
      description: req.body.desc,
      category:req.body.category,
      price: req.body.price,
      pid: req.body.pid,
      img: {
        data: fs.readFileSync(
          path.join(__dirname + "/uploads/" + req.file.filename)
        ),
        contentType: "image/jpeg",
      },
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