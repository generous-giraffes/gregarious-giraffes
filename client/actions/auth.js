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
            console.error('POST ERROR response', response);
        } else {
            console.log('POST ERROR server', response);
        }
    });

    return {
        type: SIGNUP_USER,
        payload: request
    };
}

export function signinUser(email, password) {
    let request = axios.post('/api/login', {
            user: {
                email: email,
                password: password
            }
        })
        .then((response) => {
           console.log(response, "this is JAKES FAVORITE ONE");
        })
        .catch((response) => {
            if (response instanceof Error) {
                console.error('POST ERROR RESPONSE', response);
            } else {
                console.log('POST ERROR SERVER', response);
            }
        });

    //let data = request.data;
    //console.log(request, 'this is the request action/auth.js line 44');
    //console.log(data, 'this is the data action/auth.js line 44');
    console.log(request, 'this is the request.data');
    return {
        type: LOGIN_USER,
        payload: request
    }
}
