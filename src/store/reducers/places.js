import * as actionTypes from '../actions/actionTypes';

const initialState = {
    places: [],
    placeAdded: false,
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
        case actionTypes.START_ADD_PLACE:
            return {
                ...state,
                placeAdded: false,
            };
        case actionTypes.PLACE_ADDED:
            return {
                ...state,
                placeAdded: true,
            };
        default:
            return state;
    }
};

export default reducer;
