import { SIGNUP_USER, LOGIN_USER } from '../actions/auth';

export function auth_Reducer(state = {}, action) {
    switch (action.type) {
        case SIGNUP_USER:
            return Object.assign({}, state,
                {
                    token: action.payload.headers.token,
                    name: action.payload.data.name,
                    email: action.payload.data.email,
                    isAuthenticated: action.payload.data.isAuthenticated
                });
        case LOGIN_USER:
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
