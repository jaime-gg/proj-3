import { gql } from '@apollo/client';

export const QUERY_ALL_BOOKS = gql`
    {
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
`;

export const QUERY_BOOKS = gql`
    query getBooks($filter: ID) {
        books(filter: $filter) {
            _id
            name
            description
            price
            quantity
            image
            filter {
                _id
            }
        }
    }
`;

export const QUERY_FILTERS = gql`
    {
        filters {
            _id
            name
        }
    }
`;

export const QUERY_USER = gql`
    {
        user {
            firstName
            lastName
            orders {
                _id
                purchaseDate
                books {
                    _id
                    name
                    description
                    price
                    quantity
                    image
                }
            }
        }
    }
`;

export const QUERY_CHECKOUT = gql`
    query getCheckout($books: [ID]!) {
        checkout(books: $books) {
            session
        }
    }
`;