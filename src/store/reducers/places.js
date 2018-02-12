import * as actionTypes from '../actions/actionTypes';

const initialState = {
    places: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PLACE:
            return {
                ...state,
                places: state.places.concat({
                    key: Math.random().toString(),
                    name: action.placeName,
                    image: {
                        uri: 'https://picsum.photos/400/400?image=4',
                    },
                }),
            };
        case actionTypes.DELETE_PLACE:
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
