const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validate = require("validator")

const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',  // Adding reference to the Category model
    },
    images:{ 
        type: [String],
        validate: [arrayLimit, '{PATH} exceeds the limit of 5'],
    },
    price: {
        type: Number,
        min:0
    },
    pvValue: {
        type: Number,
    }
}, {
    timestamps: true
});

function arrayLimit(val) {
    return val.length <= 5;
}

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
