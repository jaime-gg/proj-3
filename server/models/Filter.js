const mongoose = require('mongoose');

const { Schema } = mongoose;

const filterSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});

const Filter = mongoose.model('Filter', filterSchema);

module.exports = Filter;
