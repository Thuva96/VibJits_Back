const jwt = require("jsonwebtoken");
const favouriteModel = require("./favouriteModel");

module.exports.getDataFromDBService = () => {
    return new Promise((resolve, reject) => {
        favouriteModel
            .find({})
            .populate('user')
            .populate('products')
            .then((result) => resolve(result))
            .catch((error) => {
                console.error("Error fetching all favourites:", error);
                reject(false);
            });
    });
};

module.exports.getFavouriteByUserDBService = (userId) => {
    return new Promise((resolve, reject) => {
        favouriteModel
            .findOne({ user: userId }) // Find by user ObjectId
            .populate('user') // Populate user details
            .populate('products') // Populate product details
            .then((result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(new Error("No favourite entry found for the user"));
                }
            })
            .catch((error) => {
                console.error("Error fetching favourite by user ID:", error);
                reject(error);
            });
    });
};

module.exports.createFavouriteDBService = (favouriteDetails) => {
    return new Promise((resolve, reject) => {
        var favouriteModelData = new favouriteModel({
            user: favouriteDetails.user,
            products: favouriteDetails.products
        });

        favouriteModelData
            .save()
            .then((result) => resolve(true))
            .catch((error) => {
                console.error("Error creating favourite:", error);
                reject(false);
            });
    });
};

module.exports.updateFavouriteDBService = (id, favouriteDetails) => {
    return new Promise((resolve, reject) => {
        favouriteModel
            .findByIdAndUpdate(id, favouriteDetails, { new: true }) // Return the updated document
            .then((result) => resolve(result))
            .catch((error) => {
                console.error("Error updating favourite:", error);
                reject(false);
            });
    });
};

module.exports.removeFavouriteDBService = (id) => {
    return new Promise((resolve, reject) => {
        favouriteModel
            .findByIdAndDelete(id)
            .then((result) => resolve(result))
            .catch((error) => {
                console.error("Error deleting favourite:", error);
                reject(false);
            });
    });
};
