import * as actionTypes from '../actions/actionTypes';

const initialState = {
    places: [],
    selectedPlace: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PLACE:
            return {
                ...state,
                places: state.places.concat({
                    key: Math.random(),
                    name: action.placeName,
                    image: {
                        uri: 'https://picsum.photos/400/400?image=4'
                    }
                })
            };
        case actionTypes.DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter(
                    place => place.key !== state.selectedPlace.key
                ),
                selectedPlace: null
            };
        case actionTypes.SELECT_PLACE:
            return {
                ...state,
                selectedPlace: state.places.find(place => {
                    return place.key === action.placeKey;
                })
            };
        case actionTypes.DESELECT_PLACE:
            return {
                ...state,
                selectedPlace: null
            };
        default:
            return state;
    }
};

export default reducer;
