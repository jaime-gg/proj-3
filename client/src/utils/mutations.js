import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

export const ADD_ORDER = gql`
    mutation addOrder($books: [ID]!) {
        addOrder(books: $books) {
            purchaseDate
            books {
                _id
                name
                description
                price
                quantity
                filter {
                    name
                }
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser(
        $firstName: String!
        $lastName: String!
        $email: String!
        $password: String!
    ){
        addUser(
            firstName: $firstName
            lastName: $lastName
            email: $email
            password: $password
        ) {
            token
            user {
                _id
            }
        }
    }
`;


export const ADD_BOOK = gql`
    mutation addBook(
        $name: String!
        $author: String!
        $description: String!
        $price: Float!
        $quantity: Int!
        $image: string

    ){
        addBook(
            name: $name
            author: $author
            description: $description
            price: $price
            quantity: $quantity
            image: $image
        ) {
            book {
                _id
            }
        }
    }
`;