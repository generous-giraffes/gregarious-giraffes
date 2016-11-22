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

//This action gets images for the dashboard from what users have uploaded
export function getDashboardImages() {
  let response = axios.get('/api/dashboardImages')
    .then((res) => removeRepeatsAndAddCommentsArray(res.data))
    .catch((error) => console.error(error));

  return {
    type: types.GET_DASH_IMAGES,
    payload: response
  }
}

//This action allows a user to comment on the images loaded to the dashboard
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


//This action gets recent users and adds them to the dashboard feed
export function getRecentUsers(id) {
  let response = axios.get('/api/dashboardUsers/')
    .then((res) => res.data)
    .catch((error) => console.error(error));

  return {
    type: types.GET_RECENT_USERS,
    payload: response
  }
}

//This action creates a readable birthdate from the user's birthdays in the database
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


//This actions pulls the user birthdays for the current month to add to the dashboard feed
export function getBdays(month) {
  let response = axios.get(`api/dashboardBdays?month=${month}`)
    .then((res) => prettifyDOBs(res.data))
    .catch((error) => console.error(error));

    return {
      type: types.GET_BDAYS,
      payload: response
    }
}
