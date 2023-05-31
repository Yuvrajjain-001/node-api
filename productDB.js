require("dotenv").config();
const connectDB = require("./db/connect");

const Product = require("./models/product");

const ProductJson = require('./product.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(ProductJson);
    console.log("success");
    
  } catch (e) {
    console.log(e);
  }
};
start();