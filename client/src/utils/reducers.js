import { useReducer } from 'react';

import {

} from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        // ADD CASES


        // SET THIS AS DEFAULT
        default:
            return state;
    }
}

export function useBookReducer(initialState) {
    return useReducer(reducer, initialState);
}