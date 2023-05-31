const { query } = require("express");
const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { company, name, sort, feature, select } = req.query;
  const queryObj = {};

  if (company) {
    queryObj.company = company;
  }

  // here i represent case insesitive
  //it will search for both Iphone and iphone
  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }

  if (feature) {
    queryObj.feature = feature;
  }

  let apiData = Product.find(queryObj);

  if (sort) {
    let sortFix = sort.replace(",", " ");
    apiData = apiData.sort(sortFix);
  }
  if (select) {
    // let selectFix = select.replace(",", " ");
    let selectFix = select.split(",").join(" ");

    apiData = apiData.select(selectFix);
  }
  let page = Number(req.query.page) || 1;

  let limit = Number(req.query.limit) || 4;

  let skip = (page - 1) * limit;

  apiData = apiData.skip(skip).limit(limit);
  console.log("queryObj", queryObj);

  const Products = await apiData;

  res.status(200).json({ nbHits: Products.length, Products });
};

const getAllProductsTesting = async (req, res) => {
  res.status(200).json({ msg: "I am test" });
};

module.exports = { getAllProducts, getAllProductsTesting };
