import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SET_TOKEN:
            return {
                ...state,
                token: action.token,
            };
        case actionTypes.AUTH_REMOVE_TOKEN:
            return {
                ...state,
                token: null,
            };
        default:
            return state;
    }
};

export default reducer;
