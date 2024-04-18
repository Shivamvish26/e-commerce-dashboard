// const { MongoClient } = require("mongodb");
// // const data = require('./data');
// const url = "mongodb://127.0.0.1:27017";
// const database = "e-comm";
// const client = new MongoClient(url);

// async function getData() {
//   let result = await client.connect();
//   let db = result.db(database);
//   let collection = db.collection("products");
//   let response = await collection.find({}).toArray();
//   console.log(response);
// }

// getData();

// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();
// const connectDB = async () => {
//   mongoose.connect("mongodb://127.0.0.1:27017/e-comm");
//   const productsSchema = new mongoose.Schema({});
//   const products = mongoose.model("products", productsSchema);
//   const data = await products.find();
//   console.warn(data);
// };
// connectDB();
// app.listen(5000);

const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/product");
const app = express();

app.use(express.json());
app.use(cors());

//Signup Api
app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  resp.send(result);
});

//Login Api
app.post("/login", async (req, resp) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    console.log(user);
    if (user) {
      resp.send(user);
    } else {
      resp.send({ result: "No User Found" });
    }
  } else {
    resp.send({ result: "No User Found" });
  }
});

//product
app.post("/add-product", async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

//Product List
app.get("/products", async (req, resp) => {
  let product = await Product.find();
  if (product.length > 0) {
    resp.send(product);
  } else {
    resp.send({ result: "No products Found" });
  }
});

//Delete Product
app.delete("/products/:id", async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

//Fetching single Product
app.get("/products/:id", async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No Record Found" });
  }
});

//update product
app.put("/products/:id", async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});

//Search Api
app.get("/search/:key", async (req, resp) => {
  let result = await Product.find({
    '$or':[
      { name :{$regex: req.params.key} },
      { company :{$regex: req.params.key} },
      { category :{$regex: req.params.key} },
    ]
  });
  resp.send(result);
});

app.listen(5000);
