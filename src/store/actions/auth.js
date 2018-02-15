import { AsyncStorage } from 'react-native';

import * as actionTypes from './actionTypes';
import * as actions from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

const API_KEY = 'AIzaSyDZV9kHzMVhjjbgd0s-VxquBWYKV8WQVRI';

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        dispatch(actions.uiStartLoading());
        let url =
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
            API_KEY;
        if (authMode == 'signup') {
            url =
                'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
                API_KEY;
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .catch(err => {
                console.log(err);
                alert('Authentication failed, please try again');
                dispatch(actions.uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(actions.uiStopLoading());
                if (parsedRes.idToken) {
                    dispatch(
                        authStoreToken(parsedRes.idToken, parsedRes.expiresIn)
                    );
                    startMainTabs();
                } else {
                    alert('Authentication failed, please try again');
                }
            });
    };
};

export const authStoreToken = (token, expiresIn) => {
    return dispatch => {
        dispatch(authSetToken(token));
        const now = new Date();
        const expiryDate = now.getTime() + expiresIn * 1000;
        AsyncStorage.setItem('ap:auth:token', token);
        AsyncStorage.setItem('ap:auth:expiryDate', expiryDate.toString());
    };
};

export const authSetToken = token => {
    return {
        type: actionTypes.AUTH_SET_TOKEN,
        token: token,
    };
};

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            if (!token) {
                let fetchedToken;
                AsyncStorage.getItem('ap:auth:token')
                    .catch(err => reject())
                    .then(tokenFromStorage => {
                        fetchedToken = tokenFromStorage;
                        if (!tokenFromStorage) {
                            reject();
                            return;
                        }
                        return AsyncStorage.getItem('ap:auth:expiryDate');
                    })
                    .then(expiryDate => {
                        const parsedExpiryDate = new Date(parseInt(expiryDate));
                        const now = new Date();
                        if (parsedExpiryDate > now) {
                            dispatch(authSetToken(fetchedToken));
                            resolve(fetchedToken);
                        } else {
                            reject();
                        }
                    })
                    .catch(err => reject());
            } else {
                resolve(token);
            }
        });
        return promise;
    };
};

export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => startMainTabs())
            .catch(err => console.log('Faild to fetch token!'));
    };
};
