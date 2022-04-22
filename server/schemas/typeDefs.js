const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Books {
        _id: ID
        name: String
        description: String
        image: String
        quantity: Int
        price: Float
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
        products: [Product]
    }

    type Checkout {
        session: ID
    }

    type Auth {
        token: ID
        user: User
    }


    type Query {
        product(_id: ID!): Product
        user: User
        order(_id: ID!): Order
        checkout(products: [ID]!): Checkout 
    }

    type Mutation {

    }
`;

module.exports = typeDefs;
