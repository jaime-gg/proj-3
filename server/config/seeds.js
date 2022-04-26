const db = require('./connection');
// IMPORT AND CREATE SEEDS FOR RESPECTIVE MODALS 
const { User, Book, Filter } = require('../models');

db.once('open', async () => {
    await Filter.deleteMany();
    const filters = await Filter.insertMany([
        { name: 'Art' },
        { name: 'Collections' },
        { name: 'Crime' },
        { name: 'Fiction' },
        { name: 'History' },
        { name: 'Science' },
        { name: 'Textbook' },
        { name: 'Non-Fiction' }
    ]);
    console.log('filters have been seeded');

    // ================================================================================================

    await Book.deleteMany();
    const Books = await Book.insertMany([

        {
            name: 'Death of a Stray Cat',
            description: "When a woman's body is discovered at her lover's villa, the police discover a trail of lovers - all of whom have a reason to wish her dead.",
            image: 'stray-1962.jpg',
            filters: filters[3, 4]._id,
            price: 75.99,
            quantity: 5
        },

    ])
    console.log('books have been seeded');

    // ================================================================================================
    
    await User.deleteMany();
    await User.create({
        firstName: 'John',
        lastName: 'Smith',
        email: 'vendor@mail.com',
        password: 'password123',
    });
    console.log('users seeded');

    process.exit();
});
