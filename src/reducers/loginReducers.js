/*
Reducers for actions 
*/
import {SET_USER_INFO, SIGNUP_SUCCESSED} from '../actions/actionTypes';
import appState from '../contants/initialState';

const loginReducer = (state = appState.login, action) => {
    switch (action.type) {
        case SET_USER_INFO:
            return { ...state, ...{ userInfo: action.data } };
        case SIGNUP_SUCCESSED:
            return { ...state, ...{ isSignupSuccess: true } }
        default:
            return state
    }
}
export default loginReducer 

