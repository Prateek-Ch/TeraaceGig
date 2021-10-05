var mongoose =  require('mongoose');

const attributeSchema = new mongoose.Schema({
    pid:{type: Number, required: true},
    color: {type:String, required: true},
    sizes: [String],
    stockAvail: [Number]
});

module.exports = mongoose.model("attribute",attributeSchema);