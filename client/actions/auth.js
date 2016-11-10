import axios from 'axios';

export const SIGNUP_USER = 'SIGNUP_USER';
export const LOGIN_USER = 'LOGIN_USER';

const testDispatch = (data) => {
  return {
    type: LOGIN_USER,
    data
  }
};

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
  return (dispatch) => {
    return axios.post('/api/login', {
            user: {
                email: email,
                password: password
            }
        })
      .then(response => {
        // Dispatch a synchronous action
        // to handle data
        let bigBadPayload = {
          token: response.headers.token,
          name: response.data[0].name,
          email: response.data[0].email
        };
        console.log('dipsathced in auth actions, going to reducer? bigBadPayload', bigBadPayload);
        dispatch(testDispatch(bigBadPayload))
      })
      .catch(error => {
        throw(error);
      });
  };
};
    // const request = axios.post('/api/login', {
    //         user: {
    //             email: email,
    //             password: password
    //         }
    //     })
    //     //.then((response) => {
    //     //    console.log(response, "this is JAKES FAVORITE ONE");
    //     //})
    //     .catch((response) => {
    //         if (response instanceof Error) {
    //             console.error('POST ERROR RESPONSE', response);
    //         } else {
    //             console.log('POST ERROR SERVER', response);
    //         }
    //     });
    //
    // //let data = request.data;
    // //console.log(request, 'this is the request action/auth.js line 44');
    // //console.log(data, 'this is the data action/auth.js line 44');
    // console.log(request, 'this is the request.data');
    // return {
    //     type: LOGIN_USER,
    //     payload: request
    // };
// }
