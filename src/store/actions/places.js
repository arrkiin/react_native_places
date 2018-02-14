import * as actionTypes from './actionTypes';
import * as actions from './index';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        dispatch(actions.uiStartLoading());
        fetch(
            'https://us-central1-awesome-places-1518441622081.cloudfunctions.net/storeImage',
            {
                method: 'POST',
                body: JSON.stringify({ image: image.base64 }),
            }
        )
            .catch(err => {
                console.log(err);
                alert('Something went wrong, please try again!');
                dispatch(actions.uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                const placeData = {
                    name: placeName,
                    location: location,
                    image: parsedRes.imageUrl,
                };
                return fetch(
                    'https://awesome-places-1518441622081.firebaseio.com/places.json',
                    {
                        method: 'POST',
                        body: JSON.stringify(placeData),
                    }
                );
            })
            .catch(err => {
                console.log(err);
                alert('Something went wrong, please try again!');
                dispatch(actions.uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                dispatch(actions.uiStopLoading());
            });
    };
};

export const setPlaces = places => {
    return {
        type: actionTypes.SET_PLACES,
        places: places,
    };
};

export const getPlaces = () => {
    return dispatch => {
        fetch('https://awesome-places-1518441622081.firebaseio.com/places.json')
            .catch(err => {
                console.log(err);
                alert('Something went wrong, please try again!');
            })
            .then(res => res.json())
            .then(parsedRes => {
                const places = [];
                for (let key in parsedRes) {
                    places.push({
                        ...parsedRes[key],
                        image: {
                            uri: parsedRes[key].image,
                        },
                        key: key,
                    });
                }
                console.log(parsedRes);
                dispatch(setPlaces(places));
            });
    };
};

export const deletePlace = key => {
    return {
        type: actionTypes.DELETE_PLACE,
        key: key,
    };
};
