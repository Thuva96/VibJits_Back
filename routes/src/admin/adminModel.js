var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Creating admin model
var AdminSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },  
    address: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    isadmin: {
        type: String
    },
    role: {
        type: String,
        default: 'Admin'
    }
});

module.exports = mongoose.model('admin', AdminSchema);