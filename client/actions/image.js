import axios from 'axios';
import * as types from '../constants/ActionTypes'


export function submitProfileImage(data) {
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
  let response = axios.post('/api/userImages', {
    caption: data.caption,
    id: data.id,
    data_uri: data.data_uri,
    filename: data.filename,
    filetype: data.filetype
  })
    .then((res) => res.data)
    .catch((error) => console.error(error));

  return {
    type: types.POST_USER_IMAGE,
    payload: response
  }
}

export function getUserImages(id) {
  let response = axios.get('/api/userImages?id=' + id)
    .then((res) => res.data)
    .catch((error) => console.error(error));

  return {
    type: types.GET_USER_IMAGES,
    payload: response
  }
}
export function getProfileImage(id) {
  let response = axios.get('/api/profileImage?id=' + id)
    .then((res) => res.data)
    .catch((error) => console.error(error));

  return {
    type: types.GET_PROFILE_IMAGE,
    payload: response
  }
}
