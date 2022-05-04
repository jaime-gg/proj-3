const { AuthenticationError } = require('apollo-server-express');
const { Book, Filter, User, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('pk_test_51KvW8CI1xfLYtnPd5U2Z30BWFjpy6NRAYmQNSlX7UMt74jo56EDaUnTZZQHElT2WxIDbOAwJdyvtYvU3iZEjXTeo00Nf53qVKi');


const resolvers = {
    Query: {
        filters: async () => {
            return await Filter.find();
        },

        books: async (parent, { filter, name }) => {
            const params = {};

            if (filter) {
                params.filter = filter;
            }

            if (name) {
                params.name = {
                    $regex: name
                };
            }

            return await Book.find(params).populate('filter');
        },

        book: async (parent, { _id }) => {
            return await Book.findById(_id).populate('filter');
        },

        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.books',
                    populate: 'filter'
                });

                user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

                return user;
            }

            throw new AuthenticationError('Not logged in');
        },

        book: async (parent, { _id }) => {
            return await Book.findById(_id).populate('filter');
        },

        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.books',
                    populate: 'filter'
                });

                user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

                return user;
            }

            throw new AuthenticationError('Not logged in');
        },

        order: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.books',
                    populate: 'filter'
                });

                return user.orders.id(_id);
            }

            throw new AuthenticationError('Not logged in');
        },

        checkout: async (parent, args, context) => {
            const order = new Order({ books: args.books });
            const { books } = await order.populate('books');
            
            const line_items = [];
            
            for (let i = 0; i < books.length; i++) {
                // generate book id
                const book = await stripe.books.create({
                    name: books[i].name,
                    description: books[i].description
                });
                console.log(book)

                // generate price id using the book id
                const price = await stripe.prices.create({
                    book: book.id,
                    unit_amount: books[i].price * 100,
                    currency: 'usd',
                });

                // add price id to the line items array
                line_items.push({
                    price: price.id,
                    quantity: 1
                });

                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items,
                    mode: 'payment',
                    success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
                    cancel_url: 'https://example.com/cancel'
                });

                return { session: session.id };
            }
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        addOrder: async (parent, { books }, context) => {
            console.log(context);
            if (context.user) {
                const order = new Order({ books });

                await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

                return order;
            }

            throw new AuthenticationError('Not logged in');
        },

        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }

            throw new AuthenticationError('Not logged in');
        },

        updateBook: async (parent, { _id, quantity }) => {
            const decrement = Math.abs(quantity) * -1;

            return await Book.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        }
    }
};

module.exports = resolvers;
