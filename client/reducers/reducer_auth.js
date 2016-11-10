import { SIGNUP_USER, LOGIN_USER } from '../actions/auth';


export function auth(state = {token: null, name: null, email: null, isAuthenticated: false}, action) {
  console.log(action.payload, 'auth reducer++++++++++++++++++++++++++++++++++++++++++++++++++++++');
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
                    token: action.payload.headers.token,
                    name: action.payload.data[0].name,
                    email: action.payload.data[0].email,
                    isAuthenticated: action.payload.data.isAuthenticated
                });
        default:
            return state;
    }
}