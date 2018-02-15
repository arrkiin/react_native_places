import * as actionTypes from './actionTypes';
import * as actions from './index';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        let authToken;
        dispatch(actions.uiStartLoading());
        dispatch(actions.authGetToken())
            .catch(() => {
                alert('No valid token found');
            })
            .then(token => {
                authToken = token;
                return fetch(
                    'https://us-central1-awesome-places-1518441622081.cloudfunctions.net/storeImage',
                    {
                        method: 'POST',
                        body: JSON.stringify({ image: image.base64 }),
                        headers: { Authorization: 'Bearer ' + token },
                    }
                );
            })
            .then(res => res.json())
            .then(parsedRes => {
                const placeData = {
                    name: placeName,
                    location: location,
                    image: parsedRes.imageUrl,
                };
                return fetch(
                    'https://awesome-places-1518441622081.firebaseio.com/places.json?auth=' +
                        authToken,
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
                dispatch(actions.placeAdded());
            })
            .catch(err => {
                console.log(err);
                alert('Something went wrong, please try again!');
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

export const startAddPlace = () => {
    return {
        type: actionTypes.START_ADD_PLACE,
    };
};

export const placeAdded = () => {
    return {
        type: actionTypes.PLACE_ADDED,
    };
};

export const getPlaces = () => {
    return dispatch => {
        dispatch(actions.authGetToken())
            .catch(() => {
                alert('No valid token found');
            })
            .then(token =>
                fetch(
                    'https://awesome-places-1518441622081.firebaseio.com/places.json?auth=' +
                        token
                )
            )
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
            })
            .catch(err => {
                console.log(err);
                alert('Something went wrong, please try again!');
            });
    };
};

export const deletePlace = key => {
    return dispatch => {
        dispatch(actions.authGetToken())
            .catch(() => {
                alert('No valid token found');
            })
            .then(token => {
                dispatch(removePlace(key));
                return fetch(
                    'https://awesome-places-1518441622081.firebaseio.com/places/' +
                        key +
                        '.json?auth=' +
                        token,
                    {
                        method: 'DELETE',
                    }
                );
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log('Done!');
            })
            .catch(err => console.log(err));
    };
};

export const removePlace = key => {
    return {
        type: actionTypes.REMOVE_PLACE,
        key: key,
    };
};
