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

module.exports.createProductDBService = async (productDetails) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Find the current maximum SKU in the database
      const maxSKUProduct = await productModel.findOne().sort({ sku: -1 });

      // Extract the numeric part of the SKU and find the next SKU number
      const nextSKU = maxSKUProduct 
        ? parseInt(maxSKUProduct.sku.replace("CA", "")) + 1 
        : 1;

      // Create new product with the next SKU, prefixed by "CA"


      const productModelData = new productModel({
        sku: `CA${nextSKU}`,
        image: productDetails.image,
        productname: productDetails.productname,
        price: productDetails.price,
        description: productDetails.description,
        quantity: productDetails.quantity
      });

      productModelData
        .save()
        .then((result) => resolve(result))
        .catch((error) => {
          console.error("Error creating product:", error);
          reject(false);
        });
    } catch (error) {
      console.error("Error finding max SKU:", error);
      reject(false);
    }
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
