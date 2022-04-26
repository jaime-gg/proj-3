const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
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
    filter: {
        type: Schema.Types.ObjectId,
        ref: 'Filter',
        required: true
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
