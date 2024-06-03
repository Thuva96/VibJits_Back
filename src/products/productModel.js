var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({

    sku: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required:true
    },
    productname: {
        type: String,
        required:true
    },  
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    
});

module.exports = mongoose.model('product', ProductSchema);