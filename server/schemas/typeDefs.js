const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        _id: ID
        name: String
        description: String
        image: String
        quantity: Int
        price: Float
        filter: Filter
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        orders: [Order]
    }

    type Order {
        _id: ID
        purchaseDate: String
        books: [Book]
    }

    type Filter {
        _id: ID
        name: String
    }

    type Checkout {
        session: ID
    }

    type Auth {
        token: ID
        user: User
    }


    type Query {
        book(_id: ID!): Book
        user: User
        order(_id: ID!): Order
        checkout(books: [ID]!): Checkout
        filters: [Filter]
        books(filter: ID, name: String): [Book] 
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        addOrder(books: [ID]!): Order
        updateUser(firstName: String, lastName: String, email: String, password: String): User
        updateBook(_id: ID!, quantity: Int!): Book
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;
