var express = require('express');
var router = express.Router();

const imgModel = require('../models/product');
const {getFileStream} = require('../S3');

// TO GET About PAGE (this or app)
router.get('/',function(req,res){
    res.render('landing');
});

router.get('/images/:key',(req,res)=>{
    const key = req.params.key
    const readStream = getFileStream(key)

    readStream.pipe(res);
});

module.exports = router;
