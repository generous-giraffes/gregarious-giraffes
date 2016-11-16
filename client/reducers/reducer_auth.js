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
                    isAuthenticated: Boolean(action.payload.headers.token),
                    id: action.payload.data.id
                });
        case LOGIN_USER:
        console.log('auth reducer, data, login', action.data);
            return Object.assign({}, state,
                {
                    token: action.data.token,
                    name: action.data.name,
                    email: action.data.email,
                    isAuthenticated: Boolean(action.data.token),
                    id: action.data.id,
                    dob: action.data.dob,
                    bloodType: action.data.bloodType,
                    season: action.data.season,
                    trained: action.data.trained,
                    hobbies: action.data.hobbies,
                    species: action.data.species,
                    quote: action.data.quote,
                    image: action.data.image
                });
        default:
            return state;
    }
}
