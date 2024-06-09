var favouriteService = require("./favouriteServices");

// Function to get all the favourite details
var getDataControllerfn = async (req, res) => {
  try {
    var productData = await favouriteService.getDataFromDBService();
    res
      .status(200)
      .json({
        status: true,
        data: productData,
        message: "Data retreived successfully",
      });
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Function to get specific favourite item of a user
var findFavouriteController = async (req, res) => {
  try {
    var result = await favouriteService.getFavouriteByUserDBService(req.params.id);
    if (result) {
      res
        .status(200)
        .json({ status: true, data: result, message: "Favourite items found" });
    } else {
      res.status(404).json({ status: false, message: "Favourite items not found" });
    }
  } catch (error) {
    console.error("Error finding Favourite items:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Function to create favourite items
var createFavouriteControllerFn = async (req, res) => {
  try {
    var status = await favouriteService.createFavouriteDBService(req.body);
    if (status) {
      res
        .status(201)
        .json({ status: true, message: "Favourite item created successfully" });
    } else {
      res
        .status(400)
        .json({ status: false, message: "Error creating Favourite item" });
    }
  } catch (error) {
    console.error("Error creating Favourite item:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Function to update Favourite item
var updateFavouriteController = async (req, res) => {
  try {
    var result = await favouriteService.updateFavouriteDBService(
      req.params.id,
      req.body
    );
    if (result) {
      res
        .status(200)
        .json({ status: true, message: "Favourite Items updated successfully" });
    } else {
      res.status(404).json({ status: false, message: "Favourite Items not found" });
    }
  } catch (error) {
    console.error("Error updating Favourite Items:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// FUnction to delete Favourite
var deleteFavouriteController = async (req, res) => {
  try {
    var result = await favouriteService.removeFavouriteDBService(req.params.id);
    if (result) {
      res
        .status(200)
        .json({ status: true, message: "Favourite Item deleted successfully" });
    } else {
      res.status(404).json({ status: false, message: "Favourite Item not found" });
    }
  } catch (error) {
    console.error("Error deleting Favourite Item:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};


module.exports = {
  getDataControllerfn,
  createFavouriteControllerFn,
  updateFavouriteController,
  deleteFavouriteController,
  findFavouriteController,
};
