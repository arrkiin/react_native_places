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
                    dispatch(authSetToken(parsedRes.idToken));
                    startMainTabs();
                } else {
                    alert('Authentication failed, please try again');
                }
            });
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
                reject();
            } else {
                resolve(token);
            }
        });
        return promise;
    };
};
