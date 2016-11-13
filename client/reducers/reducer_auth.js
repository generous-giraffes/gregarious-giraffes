import { SIGNUP_USER, LOGIN_USER } from '../actions/auth';

export function auth_Reducer(state = {}, action) {
    switch (action.type) {
        case SIGNUP_USER:
        console.log('auth reducer, data', action.payload.data);
            return Object.assign({}, state,
                {
                    token: action.payload.headers.token,
                    name: action.payload.data.name,
                    email: action.payload.data.email,
                    isAuthenticated: Boolean(action.payload.headers.token)
                });
        case LOGIN_USER:
        console.log('auth reducer, data, login', action.data);
            return Object.assign({}, state,
                {
                    token: action.data.token,
                    name: action.data.name,
                    email: action.data.email,
                    isAuthenticated: Boolean(action.data.token)
                });
        default:
            return state;
    }
}
