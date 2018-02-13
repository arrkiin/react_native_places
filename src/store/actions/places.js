import * as actionTypes from './actionTypes';

// const addPlaceAction = (placeName, location, image) => {
//     type: actionTypes.ADD_PLACE,
//     placeName: placeName,
//     location: location,
//     image: image,
// }

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        const placeData = {
            name: placeName,
            location: location,
        };
        // fetch(
        //     'https://awesome-places-1518441622081.firebaseio.com/places.json',
        //     {
        //         method: 'POST',
        //         body: JSON.stringify(placeData),
        //     }
        // )
        //     .catch(err => console.log(err))
        //     .then(res => res.json())
        //     .then(parsedResp => {
        //         console.log(parsedResp);
        //     });
    };
};

export const deletePlace = key => {
    return {
        type: actionTypes.DELETE_PLACE,
        key: key,
    };
};
