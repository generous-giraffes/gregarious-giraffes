import axios from 'axios';

export const PROFILE_IMAGE = 'PROFILE_IMAGE';
export const POST_USER_IMAGE = 'POST_USER_IMAGE';
export const GET_USER_IMAGE = 'GET_USER_IMAGE';

export function submitProfileImage(data) {
  console.log(data, 'PROFILE_IMAGE action');
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
    type: PROFILE_IMAGE,
    payload: response
  }
}

export function submitUserImage(data) {
  console.log(data, 'POST_USER_IMAGE action');
  let response = axios.post('/api/userImages', {
    caption: data.caption,
    id: data.id,
    data_uri: data.data_uri,
    filename: data.filename,
    filetype: data.filetype
  })
    .then((res) => {
      console.log('in submitUserImage, here is the returned from server res.data', res.data);
      return res.data
    })
    .catch((error) => console.error(error));

  return {
    type: POST_USER_IMAGE,
    payload: response
  }
}

export function getUserImages(id) {
  console.log(id, 'GET_USER_IMAGE action, is');
  let response = axios.get('/api/image?id=' + id)
    .then((res) => res.data)
    .catch((error) => console.error(error));

  return {
    type: GET_USER_IMAGE,
    payload: response
  }
}
