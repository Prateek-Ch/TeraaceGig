
const productModel = require('./models/product')

var p = new productModel({
    name: 'abc',
    image: [],
    price: 2000,
    category: "Clothing",
    description: 'This is clothing',
    attributes: [{
        size: 'L',
        color: 'Red',
        countInStoc: 0
    },
    {
        size: 'XS',
        color: 'Red',
        countInStoc: 2
    },

],
    rating: 2,
    reviews: []
});

p.save(function(err,result){
 if(err) {
     console.log('Error is: ')
     console.log(err)
 }
 else{
     console.log("No error")
 }
});