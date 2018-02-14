import * as actionTypes from '../actions/actionTypes';

const initialState = {
    places: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PLACES:
            return {
                ...state,
                places: action.places,
            };
        case actionTypes.REMOVE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => place.key !== action.key),
                selectedPlace: null,
            };
        default:
            return state;
    }
};

export default reducer;
