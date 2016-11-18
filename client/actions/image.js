import axios from 'axios';

export const SUBMIT_PROFILE_IMAGE = 'SUBMIT_PROFILE_IMAGE';
export const GET_PROFILE_IMAGE = 'GET_PROFILE_IMAGE';
export const POST_USER_IMAGE = 'POST_USER_IMAGE';
export const GET_USER_IMAGES = 'GET_USER_IMAGES';
export const GET_DASH_IMAGES = 'GET_DASH_IMAGES';
export const COMMENT_ON_DASH_IMAGE = 'COMMENT_ON_DASH_IMAGE';

export function submitProfileImage(data) {
  console.log(data, 'SUBMIT_PROFILE_IMAGE action');
  let response = axios.post('/api/profileImage', {
    image: data.image,
    email: data.email,
    data_uri: data.data_uri,
    filename: data.filename,
    filetype: data.filetype
  })
    .then((res) => res.data)
    .catch((error) => console.error(error));

  return {
    type: SUBMIT_PROFILE_IMAGE,
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
  console.log(id, 'user iamges action');
  let response = axios.get('/api/userImages?id=' + id)
    .then((res) => res.data)
    .catch((error) => console.error(error));

  return {
    type: GET_USER_IMAGES,
    payload: response
  }
}
export function getProfileImage(id) {
  console.log(id, 'GET_PROFILE_IMAGE action');
  let response = axios.get('/api/profileImage?id=' + id)
    .then((res) => res.data)
    .catch((error) => console.error(error));

  return {
    type: GET_PROFILE_IMAGE,
    payload: response
  }
}

export function getDashboardImages() {
  console.log( 'GET_DASH_IMAGES action');
  let response = axios.get('/api/dashboardImages')
    .then((res) => res.data)
    .catch((error) => console.error(error));

  return {
    type: GET_DASH_IMAGES,
    payload: response
  }
}

export function commentOnDashImage(userId, comment) {
  console.log(userId, comment, 'COMMENT_ON_DASH_IMAGE action');
  let response = axios.post('/api/dashboardComment', {
    id: userId,
    comment: comment
  })
    .then((res) => res.data)
    .catch((error) => console.error(error));

  return {
    type: COMMENT_ON_DASH_IMAGE,
    payload: response
  }
}
