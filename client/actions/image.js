import axios from 'axios';

export const SUBMIT_IMAGE = 'SUBMIT_IMAGE';

export function submitImage(data) {
  let response = axios.post('/api/image', {
    image: data.image,
    email: data.email
  })
    .then((res) => res.data[0])
    .catch((error) => console.error(error));

  return {
    type: SUBMIT_IMAGE,
    payload: response
  }
}
