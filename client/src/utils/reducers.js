import { useReducer } from 'react';

import {
    UPDATE_BOOKS,
    UPDATE_FILTERS,
    UPDATE_CURRENT_FILTER,

    ADD_TO_CART,
    // ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
} from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_BOOKS:
            return {
                ...state,
                books: [...action.books],
            };

        case UPDATE_FILTERS:
            return {
                ...state,
                filters: [...action.filters]
            }

        case UPDATE_CURRENT_FILTER:
            return {
                ...state,
                currentFilter: action.currentFilter
            }
        // SET THIS AS DEFAULT
        default:
            return state;
    }
}

export function useBookReducer(initialState) {
    return useReducer(reducer, initialState);
}