import axios from 'axios';

export const SIGNUP_USER = 'SIGNUP_USER';
export const LOGIN_USER = 'LOGIN_USER';

export function signupUser(name, email, password) {
    const request = axios.post('/api/signup', {
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
    let data = {}
    const request = axios.post('/api/login', {
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

    //let data = request.data;
    //console.log(request, 'this is the request action/auth.js line 44');
    //console.log(data, 'this is the data action/auth.js line 44');
    console.log(request, 'this is the request.data');
    return {
        type: LOGIN_USER,
        payload: request
    };
}
