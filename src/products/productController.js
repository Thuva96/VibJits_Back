var productService = require("./productServices");

// Function to get all the product details
var getDataControllerfn = async (req, res) => {
  try {
    var productData = await productService.getDataFromDBService();
    res
      .status(200)
      .json({
        status: true,
        data: productData,
        message: "Data retrieved successfully",
      });
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Function to get specific product
var findProductController = async (req, res) => {
  try {
    var result = await productService.getProductDBService(req.params.id);
    if (result) {
      res
        .status(200)
        .json({ status: true, data: result, message: "Product found" });
    } else {
      res.status(404).json({ status: false, message: "Product not found" });
    }
  } catch (error) {
    console.error("Error finding Product:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Function to create product
var createProductControllerFn = async (req, res) => {
  try {
    var status = await productService.createProductDBService(req.body);
    if (status) {
      res
        .status(201)
        .json({ status: true, message: "Product created successfully" });
    } else {
      res
        .status(400)
        .json({ status: false, message: "Error creating product" });
    }
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Function to update product
var updateProductController = async (req, res) => {
  try {
    var result = await productService.updateProductDBService(
      req.params.id,
      req.body
    );
    if (result) {
      res
        .status(200)
        .json({ status: true, message: "Product updated successfully" });
    } else {
      res.status(404).json({ status: false, message: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating Product:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// FUnction to delete Product
var deleteProductController = async (req, res) => {
  try {
    var result = await productService.removeProductDBService(req.params.id);
    if (result) {
      res
        .status(200)
        .json({ status: true, message: "Product deleted successfully" });
    } else {
      res.status(404).json({ status: false, message: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting Product:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};


module.exports = {
  getDataControllerfn,
  createProductControllerFn,
  updateProductController,
  deleteProductController,
  findProductController,
};
