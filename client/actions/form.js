import axios from 'axios';
import * as types from '../constants/ActionTypes'

//This submits the form that users fill out upon signup
export function submitForm(data) {
  let response = axios.post('/api/form', data)
    .then((res) => res.data[0])
    .catch((err) => console.error(err));
  return {
    type: types.SUBMIT_FORM,
    payload: response
  }
}
