import axios from 'axios';
import * as types from '../constants/ActionTypes'


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
    type: types.SUBMIT_PROFILE_IMAGE,
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
    type: types.POST_USER_IMAGE,
    payload: response
  }
}

export function getUserImages(id) {
  console.log(id, 'user iamges action');
  let response = axios.get('/api/userImages?id=' + id)
    .then((res) => res.data)
    .catch((error) => console.error(error));

  return {
    type: types.GET_USER_IMAGES,
    payload: response
  }
}
export function getProfileImage(id) {
  console.log(id, 'GET_PROFILE_IMAGE action');
  let response = axios.get('/api/profileImage?id=' + id)
    .then((res) => res.data)
    .catch((error) => console.error(error));

  return {
    type: types.GET_PROFILE_IMAGE,
    payload: response
  }
}
