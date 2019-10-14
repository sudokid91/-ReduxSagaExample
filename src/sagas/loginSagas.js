var jwtDecode = require('jwt-decode');
import { SIGNUP,SIGNUP_SUCCESSED, SIGNUP_FAILED,LOGIN, FETCH_USER_SUCCESSED, LOGIN_FAILED, SET_USER_INFO, FETCH_USER_INFO
 } from '../actions/actionTypes';

//Saga effects
import { put, takeLatest } from 'redux-saga/effects';
import { ApiLogin } from '../services/ApiLogin';

import { setUserInfo, fetchUserInfo } from '../actions/loginAction';

function* signup(action) {
    try {
        const data = yield ApiLogin.registerFormApi(action.user); 
        if (data.data.status == 409) {
            action.onError(data.data);
        } else {
            yield put({type:SIGNUP_SUCCESSED});
        }
    } catch (error) { 
        console.log(`error call api signup: ${JSON.stringify(error)}`);
        // action.onError(error);
    }
}

export function* watchSignup() {  
    yield takeLatest(SIGNUP, signup);
}

function* login(action) {
    try {
        const data = yield ApiLogin.loginFormApi(action.user);
        if (data) {
            const dataJson = JSON.parse(data);
            action.onSuccess(data);
            // yield put (fetchUserInfo({umUserName: "hoangnn"}, "123"));
            yield put (fetchUserInfo(JSON.parse(dataJson.config.data), dataJson.data.access_token));
        } else {
            action.onError({error: "user or password invalid"});
        }
    } catch (error) { 
        action.onError(error); 
    }
}

export function* watchLogin() { 
    yield takeLatest(LOGIN, login);
}

function* fetchUser(action) {
    try {
        let token = action.token;
        const data = yield ApiLogin.fetchUserInfoFormApi(action.data.umUserName, token);
        if (typeof(data.umUserName) !== 'undefined' && data.umUserName.length > 0) {
            yield put(setUserInfo(data));
        }
        action.onSuccess(data);
    } catch (error) {
        // action.onError(error);
    } 
}
 
export function* watchFetchUserInfo() {
    yield takeLatest(FETCH_USER_INFO, fetchUser);
} 
