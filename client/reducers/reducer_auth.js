import { SIGNUP_USER, LOGIN_USER } from '../actions/auth';

export function authReducer(state = {initialState:" IT IS BEING INITIALIZED EVERY TIME HERE"}, action) {
    switch (action.type) {
        case SIGNUP_USER:
            return Object.assign({}, state,
                {
                    token: action.payload.headers.token,
                    name: action.payload.data.name,
                    email: action.payload.data.email
                });
        case LOGIN_USER:
        console.log(action,"sction in auth reducer LOGIN USER");
            return Object.assign({}, state,
                {
                    token: action.data.token,
                    name: action.data.name,
                    email: action.data.email
                });
        default:
            return state;
    }
}
