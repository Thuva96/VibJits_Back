const { CURSOR_FLAGS } = require("mongodb");
const jwt = require("jsonwebtoken");
var adminModel = require("./adminModel");

// Getting all the admin details from DB
module.exports.getDataFromDBService = () => {
  return new Promise((resolve, reject) => {
    adminModel
      .find({})
      .then((result) => resolve(result))
      .catch((error) => reject(false));
  });
};

// Getting details of the specific admin using the id from DB 
module.exports.getAdminDBService = (id) => {
  return new Promise((resolve, reject) => {
    adminModel
      .findById(id)
      .then((result) => resolve(result))
      .catch((error) => {
        console.log("Error caused while fetching :id " + error);
      });
  });
};

// Creating new admin in the DB
module.exports.createAdminDBService = (adminDetails) => {
  return new Promise((resolve, reject) => {
    var adminModelData = new adminModel();
    adminModelData.name = adminDetails.name;
    adminModelData.email = adminDetails.email;
    adminModelData.password = adminDetails.password;
    adminModelData.address = adminDetails.address;
    adminModelData.number = adminDetails.number;
    adminModelData.isadmin = adminDetails.isadmin;

    adminModelData
      .save()
      .then((result) => resolve(true))
      .catch((error) => reject(false));
  });
};

// Updating the admin details in the DB
module.exports.updateAdminDBService = (id, adminDetails) => {
  return new Promise((resolve, reject) => {
    adminModel
      .findByIdAndUpdate(id, adminDetails)
      .then((result) => resolve(result))
      .catch((error) => reject(false));
  });
};

// Removing admin from the DB
module.exports.removeAdminDBService = (id) => {
  return new Promise((resolve, reject) => {
    adminModel
      .findByIdAndDelete(id)
      .then((result) => resolve(result))
      .catch((error) => reject(false));
  });
};

// Getting specific admin for the login from DB
module.exports.loginAdminController = async (name, password) => {
  try {
    const user = await adminModel.findOne({ name, password });

    if (user) {
      const token = generateToken(user._id);
      return { user, token };
    } else {
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// Generating JWT Token for successful login
function generateToken(userId) {
  const crypto = require("crypto");

  // Generate a random secret key
  const secretKey = crypto.randomBytes(32).toString("hex");
  // Expires in 1 Hour
  const expiresIn = "1h";

  return jwt.sign({ userId }, secretKey, { expiresIn });
}
