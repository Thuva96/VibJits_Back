var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    }
    ],

});

module.exports = mongoose.model('favourite', ProductSchema);