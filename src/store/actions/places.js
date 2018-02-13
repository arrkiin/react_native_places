import * as actionTypes from './actionTypes';

export const addPlace = (placeName, location) => {
    return {
        type: actionTypes.ADD_PLACE,
        placeName: placeName,
        location: location,
    };
};

export const deletePlace = key => {
    return {
        type: actionTypes.DELETE_PLACE,
        key: key,
    };
};
