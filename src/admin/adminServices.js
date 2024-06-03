const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const adminModel = require("./adminModel");

// Getting all the admin details from DB
module.exports.getDataFromDBService = () => {
  return new Promise((resolve, reject) => {
    adminModel
      .find({})
      .then((result) => resolve(result))
      .catch((error) => {
        console.error("Error fetching all admin data:", error);
        reject(error);
      });
  });
};

// Getting details of the specific admin using the id from DB 
module.exports.getAdminDBService = (id) => {
  return new Promise((resolve, reject) => {
    adminModel
      .findById(id)
      .then((result) => resolve(result))
      .catch((error) => {
        console.error("Error fetching admin by ID:", error);
        reject(error);
      });
  });
};

// Creating new admin in the DB
module.exports.createAdminDBService = async (adminDetails) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Hashing the password before saving
      const hashedPassword = await bcrypt.hash(adminDetails.password, 10);
      var adminModelData = new adminModel({
        name: adminDetails.name,
        email: adminDetails.email,
        password: hashedPassword,
        address: adminDetails.address,
        number: adminDetails.number,
        isadmin: adminDetails.isadmin
      });

      adminModelData
        .save()
        .then((result) => resolve(result))
        .catch((error) => {
          console.error("Error creating admin:", error);
          reject(error);
        });
    } catch (error) {
      console.error("Error hashing password:", error);
      reject(error);
    }
  });
};

// Updating the admin details in the DB
module.exports.updateAdminDBService = (id, adminDetails) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (adminDetails.password) {
        adminDetails.password = await bcrypt.hash(adminDetails.password, 10);
      }

      adminModel
        .findByIdAndUpdate(id, adminDetails, { new: true }) // Return the updated document
        .then((result) => resolve(result))
        .catch((error) => {
          console.error("Error updating admin:", error);
          reject(error);
        });
    } catch (error) {
      console.error("Error hashing password:", error);
      reject(error);
    }
  });
};

// Removing admin from the DB
module.exports.removeAdminDBService = (id) => {
  return new Promise((resolve, reject) => {
    adminModel
      .findByIdAndDelete(id)
      .then((result) => resolve(result))
      .catch((error) => {
        console.error("Error deleting admin:", error);
        reject(error);
      });
  });
};

// Getting specific admin for the login from DB
module.exports.loginAdminController = async (email, password) => {
  try {
    const user = await adminModel.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = generateToken(user._id);
      return { user, token };
    } else {
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error(error.message);
  }
};

// Generating JWT Token for successful login
function generateToken(userId) {
  const secretKey = process.env.JWT_SECRET || "default_secret_key"; // Use environment variable for the secret key
  const expiresIn = "1h";

  return jwt.sign({ userId }, secretKey, { expiresIn });
}
