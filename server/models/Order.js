const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ], 
    purchaseDate: {
        type: Date,
        default: Date.now
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
