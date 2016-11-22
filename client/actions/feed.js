import axios from 'axios';
import * as types from '../constants/ActionTypes'

//a function to sort an array of objects (containing a photo url, id, comment, caption, name, user_image_id by removing duplicates and accumlating comments for the photos in an array
const removeRepeatsAndAddCommentsArray = (photos) => {
  let resultPhotos = [];
  let commentedPhotos = photos.reduce((obj, photo) => {
    if(!obj[photo.id]) {
      obj[photo.id] = photo;
      obj[photo.id].comments = [[photo.commenter_name, photo.comment]];
      return obj;
    }
    obj[photo.id].comments.push([photo.commenter_name, photo.comment]);
    return obj;
  }, {})

  for(var photoObj in commentedPhotos){
    resultPhotos.push(commentedPhotos[photoObj]);
  }

  return resultPhotos;
}

export function getDashboardImages() {
  let response = axios.get('/api/dashboardImages')
    .then((res) => removeRepeatsAndAddCommentsArray(res.data))
    .catch((error) => console.error(error));

  return {
    type: types.GET_DASH_IMAGES,
    payload: response
  }
}

export function commentOnDashImage(userId, comment, imageId, user_image_id, userName) {
  let response = axios.post('/api/dashboardComment', {
    id: userId,
    comment,
    imageId,
    user_image_id,
    userName
  })
    .then((res) => removeRepeatsAndAddCommentsArray(res.data))
    .catch((error) => console.error(error));

  return {
    type: types.COMMENT_ON_DASH_IMAGE,
    payload: response
  }
}

export function getRecentUsers(id) {
  let response = axios.get('/api/dashboardUsers/')
    .then((res) => res.data)
    .catch((error) => console.error(error));

  return {
    type: types.GET_RECENT_USERS,
    payload: response
  }
}

const prettifyDOBs = (users) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  let niceDobUsers = users.map((user) => {
    let dob = user.dob.split('-');
    let month = months[dob[1]-1];
    let prettyDob = `${month} ${dob[2]}, ${dob[0]}`;
    user.prettyDob = prettyDob;
    return user;
  })
  return niceDobUsers;
}

export function getBdays(month) {
  let response = axios.get(`api/dashboardBdays?month=${month}`)
    .then((res) => prettifyDOBs(res.data))
    .catch((error) => console.error(error));

    return {
      type: types.GET_BDAYS,
      payload: response
    }
}
