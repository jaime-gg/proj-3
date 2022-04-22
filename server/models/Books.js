const mongoose = require('mongoose');

const { Schema } = mongoose;

const booksSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 0.99
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0
    },
    // MAY WANT FOR FILTER COMPONENT
    // category: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Category',
    //     required: true
    // }
});

const Books = mongoose.model('Books', booksSchema);

module.exports = Books;
