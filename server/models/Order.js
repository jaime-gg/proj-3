const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
