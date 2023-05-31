const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: [true, "price must be provided"] },
  feature: { type: Boolean, default: false, required: true },
  rating: {
    type: Number,
    default: 4.9
    },
  createdAt: { type: Date, required: true, default: Date.now() },
company: { type: String, 
  enum:{
    values:["apple","samsung","oneplus","mi","vivo"],
    message:`{VALUE} is not supported`,
  },
},

});

module.exports = mongoose.model('Product',productSchema)