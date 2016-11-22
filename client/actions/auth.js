import axios from 'axios';
import * as types from '../constants/ActionTypes';

//action to be dispatched if signInUser is successful
const signInUserSuccess = (data) => {
  return {
    type: types.LOGIN_USER,
    data
  }
};

//function that sends user info to db and sends the user's data to the auth reducer
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
      type: types.SIGNUP_USER,
      payload: request
  };
}
//function that sends user info to server to check if it matches info in the db. If it does an action is dispatched to the auth reducer to update the state to authenticate the user
export function signinUser(email, password) {
  return (dispatch) => {
    return axios.post('/api/login', {
      user: {
        email: email,
        password: password
      }
    }).then(response => {
        let payload = {
          token: response.headers.token,
          name: response.data[0].name,
          email: response.data[0].email,
          id: response.data[0].id,
          dob: response.data[0].dob,
          bloodType: response.data[0].bloodType,
          season: response.data[0].season,
          trained: response.data[0].trained,
          hobbies: response.data[0].hobbies,
          species: response.data[0].species,
          quote: response.data[0].quote,
          image: response.data[0].image
        };
        // Dispatch a synchronous action to handle payload
        dispatch(signInUserSuccess(payload))
      }).catch(error => {
          throw(error);
      });
  };
}

export function logoutAndRedirect() {

    return {
        type: types.LOGOUT_USER
    }
};


