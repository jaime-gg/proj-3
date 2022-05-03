import { useReducer } from "react";

import {
  UPDATE_BOOKS,
  UPDATE_FILTERS,
  UPDATE_CURRENT_FILTER,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  UPDATE_DISPLAY_BOOKS
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_BOOKS:
      return {
        ...state,
        books: [...action.books],
        displayBooks: [...action.displayBooks]
      };

    case UPDATE_FILTERS:
      return {
        ...state,
        filters: [...action.filters],
      };

    case UPDATE_CURRENT_FILTER:
      return {
        ...state,
        currentFilter: action.currentFilter,
      };

    case UPDATE_DISPLAY_BOOKS:
      return {
        ...state,
        displayBooks:[...action.displayBooks],
      };

    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.book],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.books],
      };

    case REMOVE_FROM_CART:
      let newState = state.cart.filter((book) => {
        return book._id !== action._id;
      });

      return {
        ...state,
        cart: newState,
      };

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((book) => {
          if (action._id === book._id) {
            book.purchaseQuantity = action.purchaseQuantity;
          }
          return book;
        }),
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    // SET THIS AS DEFAULT
    default:
      return state;
  }
};

export function useBookReducer(initialState) {
  return useReducer(reducer, initialState);
}
