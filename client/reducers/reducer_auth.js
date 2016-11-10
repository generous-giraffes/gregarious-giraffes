import { SIGNUP_USER, LOGIN_USER } from '../actions/auth';

export function authReducer(state = {token: null, name: null, email: null}, action) {
  console.log(action.payload, 'auth reducer++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    switch (action.type) {
        case SIGNUP_USER:
            return Object.assign({}, state,
                {
                    token: action.payload.headers.token,
                    name: action.payload.data.name,
                    email: action.payload.data.email
                });
        case LOGIN_USER:
            return Object.assign({}, state,
                {
                    token: action.payload.headers.token,
                    name: action.payload.data[0].name,
                    email: action.payload.data[0].email
                });
        default:
            return state;
    }
}
