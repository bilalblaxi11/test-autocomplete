import { createStore } from 'redux';

const initialState = {
    autocompleteOptions: ["Test note 1"],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTOCOMPLETE_OPTIONS':
            return {
                ...state,
                autocompleteOptions: action.payload,
            };
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;
