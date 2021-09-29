var mongoose =  require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);


const imageSchema = new mongoose.Schema(
    {
        name:{type: String},
        img:
	    {
		data: Buffer,
		contentType: String
	    }
    }
);

const attriSchema = new mongoose.Schema(
    {
        size: {type: String, required: true},
        color: {type: String, required: true},
        countInStock: {type:Number, required: true}
    }
);

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: [imageSchema],
  price: { type: Number, default: 0, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  attributes: [attriSchema],
  rating: { type: Number, default: 0, required: true },
  reviews: [reviewSchema],
});

module.exports = mongoose.model("product",productSchema);
