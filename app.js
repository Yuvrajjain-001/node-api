require('dotenv').config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

const product_routes =  require('./routes/product')
const db=  require('./db/connect')

app.get("/", (req, res) => {
  res.send("Hi i am live");
});


//middleware
app.use("/api/products",product_routes)

const start = async () => {
  try {
    await db(); 

    app.listen(PORT, () => {
     console.log(`${PORT} yes i am connected`); 
    });
  } catch (e) {
    console.log(e);
  }
};
start();  
