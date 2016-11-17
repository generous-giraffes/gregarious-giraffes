import axios from 'axios';

export const SUBMIT_IMAGE = 'SUBMIT_IMAGE';

export function submitImage(data) {
  console.log(data, 'SUBMIT IAMGE action');
  let response = axios.post('/api/image', {
    image: data.image,
    email: data.email,
    data_uri: data.data_uri,
    filename: data.filename,
    filetype: data.filetype
  })
    .then((res) => res.data)
    .catch((error) => console.error(error));

  return {
    type: SUBMIT_IMAGE,
    payload: response
  }
}
