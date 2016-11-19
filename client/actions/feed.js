import axios from 'axios';


export const GET_DASH_IMAGES = 'GET_DASH_IMAGES';
export const COMMENT_ON_DASH_IMAGE = 'COMMENT_ON_DASH_IMAGE';
export const GET_RECENT_USERS = 'GET_RECENT_USERS';

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
    type: GET_DASH_IMAGES,
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
    type: COMMENT_ON_DASH_IMAGE,
    payload: response
  }
}

export function getRecentUsers(id) {
  let response = axios.get('/api/dashboardUsers/')
  .then((res) => res.data)
  .catch((error) => console.error(error));

  return {
    type: GET_RECENT_USERS,
    payload: response
  }
}
