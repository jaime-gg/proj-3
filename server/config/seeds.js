const db = require('./connection');
// IMPORT AND CREATE SEEDS FOR RESPECTIVE MODALS 
const { Books } = require('../models');

db.once('open', async () => {
    await Books.deleteMany();
    const Books = await Books.insertMany([

        {
            name: '',
            description:'',
            image: '',
            // category: categories[0]._id,
            price: ,
            quantity: 
        },

    ])

    process.exit();
});
