import axios from 'axios';

export const SIGNUP_USER = 'SIGNUP_USER';
export const LOGIN_USER = 'LOGIN_USER';

export function signupUser(name, email, password) {
    const request = axios.post('/signup', {
        user: {
            name: name,
            email: email,
            password: password
        }
    }).catch((response) => {
        if (response instanceof Error) {
            console.error('POST | Error sending response', response);
        } else {
            console.log('POST | error from server', response);
        }
    });

    return {
        type: SIGNUP_USER,
        payload: request
    };
}

export function loginUser(email, password) {
    const request = axios.post('/login', {
        user: {
            email: email,
            password: password
        }
    }).catch((response) => {
        if (response instanceof Error) {
            console.error('POST | Error sending response', response);
        } else {
            console.log('POST | error from server', response);
        }
    });

    return {
        type: LOGIN_USER,
        payload: request
    };
}
