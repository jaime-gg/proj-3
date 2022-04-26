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
    query getBooks($category: ID) {
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
