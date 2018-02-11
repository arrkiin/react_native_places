import * as actionTypes from './actionTypes';

export const tryAuth = authData => {
    return {
        type: TRY_AUTH,
        authData: authData,
    };
};
