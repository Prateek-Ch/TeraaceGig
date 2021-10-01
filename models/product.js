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


// const imageSchema = new mongoose.Schema(
//     {
//         name:{type: String},
//         img:
// 	    {
// 		data: Buffer,
// 		contentType: String
// 	    }
//     }
// );

// const colorSchema = new mongoose.Schema(
//   {
//       color: {type: String, required: true},  
//       size_avail:[String],
//       countInStock: [Number] 
//   }
// );

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: {data: Buffer, contentType: String},
  price: { type: Number, default: 0, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  pid: {type: Number, required: true},
  rating : { type: Number, default: 0, required: true },
  reviews : [reviewSchema],
});

module.exports = mongoose.model("product",productSchema);
