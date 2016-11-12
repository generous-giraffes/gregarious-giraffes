import axios from 'axios';

export const SUBMIT_FORM = 'SUBMIT_FORM';

export function submitForm(data) {
  let response = axios.post('/api/form', data)
    .then((res) => res.data[0])
    .catch((err) => console.error(err));
  return {
    type: SUBMIT_FORM,
    payload: response
  }
}
