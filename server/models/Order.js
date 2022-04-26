const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
    books: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        }
    ], 
    purchaseDate: {
        type: Date,
        default: Date.now
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
