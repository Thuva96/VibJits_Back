const { CURSOR_FLAGS } = require("mongodb");
const jwt = require("jsonwebtoken");
var productModel = require("./productModel");

module.exports.getDataFromDBService = () => {
  return new Promise((resolve, reject) => {
    productModel
      .find({})
      .then((result) => resolve(result))
      .catch((error) => reject(false));
  });
};
module.exports.getProductDBService = (id) => {
  return new Promise((resolve, reject) => {
    productModel
      .findById(id)
      .then((result) => resolve(result))
      .catch((error) => {
        console.log("Error caused whie fetching :id " + error);
      });
  });
};

module.exports.createProductDBService = (productDetails) => {
  return new Promise((resolve, reject) => {
    var productModelData = new productModel();
    productModelData.sku = productDetails.sku;
    productModelData.image = productDetails.image;
    productModelData.productname = productDetails.productname;
    productModelData.price = productDetails.price;
    productModelData.description = productDetails.description;

    productModelData
      .save()
      .then((result) => resolve(true))
      .catch((error) => reject(false));
  });
};

module.exports.updateProductDBService = (id, productDetails) => {
  return new Promise((resolve, reject) => {
    productModel
      .findByIdAndUpdate(id, productDetails)
      .then((result) => resolve(result))
      .catch((error) => reject(false));
  });
};

module.exports.removeProductDBService = (id) => {
  return new Promise((resolve, reject) => {
    productModel
      .findByIdAndDelete(id)
      .then((result) => resolve(result))
      .catch((error) => reject(false));
  });
};
