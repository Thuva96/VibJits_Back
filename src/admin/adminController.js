var adminService = require("./adminServices");

// Function for Getting all the admin information
var getDataControllerfn = async (req, res) => {
  try {
    var adminData = await adminService.getDataFromDBService();
    res.status(200).json({
      status: true,
      data: adminData,
      message: "Data retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Function for Retreive only the specific admin based on the id
var findAdminController = async (req, res) => {
  try {
    var result = await adminService.getAdminDBService(req.params.id);
    if (result) {
      res
        .status(200)
        .json({ status: true, data: result, message: "Admin found" });
    } else {
      res.status(404).json({ status: false, message: "Admin not found" });
    }
  } catch (error) {
    console.error("Error finding admin:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Function for Creating a new admin
var createAdminControllerFn = async (req, res) => {
  try {
    var status = await adminService.createAdminDBService(req.body);
    if (status) {
      res
        .status(201)
        .json({ status: true, message: "Admin created successfully" });
    } else {
      res.status(400).json({ status: false, message: "Error creating admin" });
    }
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Function for Updating the existing values of the admin
var updateAdminController = async (req, res) => {
  try {
    var result = await adminService.updateAdminDBService(
      req.params.id,
      req.body
    );
    if (result) {
      res
        .status(200)
        .json({ status: true, message: "Admin updated successfully" });
    } else {
      res.status(404).json({ status: false, message: "Admin not found" });
    }
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Function for Delete the specific admin based on the id
var deleteAdminController = async (req, res) => {
  try {
    var result = await adminService.removeAdminDBService(req.params.id);
    if (result) {
      res
        .status(200)
        .json({ status: true, message: "Admin deleted successfully" });
    } else {
      res.status(404).json({ status: false, message: "Admin not found" });
    }
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Function for Login function
var loginControllerFn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await adminService.loginAdminController(
      email,
      password
    );
    res
      .status(200)
      .json({ status: true, message: "Login successful", user, token });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(403)
      .json({ status: false, message: "Invalid username or password" });
  }
};
module.exports = {
  getDataControllerfn,
  createAdminControllerFn,
  updateAdminController,
  deleteAdminController,
  findAdminController,
  loginControllerFn,
};
