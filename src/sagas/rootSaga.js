//Saga effects
import {call,fork } from 'redux-saga/effects';

import {watchLogin, watchSignup,watchFetchUserInfo}  from './loginSagas';

export default function* rootSaga() {
    yield fork(watchLogin);
    yield fork(watchSignup);
    yield fork(watchFetchUserInfo);
}