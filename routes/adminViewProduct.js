var express = require('express');
var router = express.Router();

// TO GET About PAGE (this or app)
router.get('/',function(req,res){
    res.render('admin/adminViewProducts');
})

module.exports = router;
