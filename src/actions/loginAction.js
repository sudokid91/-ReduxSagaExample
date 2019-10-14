/*
Redux in React Native - Action Creators
*/
import { 
    LOGIN, FETCH_USER_SUCCESSED, LOGIN_FAILED, SET_USER_INFO, FETCH_USER_INFO
 } from './actionTypes';
import { SIGNUP } from '../utils/screenName';

export const signUpAction =  (user, onError) => {
    return {
        type: SIGNUP,
        user,
        onError 
    }
}

export const loginAction =  (user, onSuccess, onError) => {
    return {
        type: LOGIN,
        user,
        onSuccess,
        onError
    }
}
//Action sent by Redux-saga
// export const fetchUserInfoAction = (userId) => {
//     return {
//         type: FETCH_USER_SUCCESSED,
//         userId
//     }
// }

export const setUserInfo = (data) => {
    return {
        type: SET_USER_INFO,
        data
    }
    
}
export const fetchUserInfo = (data, token, onSuccess, onError) => {
    return { 
        type: FETCH_USER_INFO,
        data,
        token,
        onSuccess,
        onError
    }
};
// export const LoginAction = {
//     loginAction
// }