import axios from 'axios';


export const GET_DASH_IMAGES = 'GET_DASH_IMAGES';
export const COMMENT_ON_DASH_IMAGE = 'COMMENT_ON_DASH_IMAGE';
export const GET_RECENT_USERS = 'GET_RECENT_USERS';


export function getRecentUsers(id) {
    let response = axios.get('/api/dashboardUsers/')
        .then((res) => res.data)
        .catch((error) => console.error(error));

    return {
        type: GET_RECENT_USERS,
        payload: response
    }
}

export function getDashboardImages() {
  let response = axios.get('/api/dashboardImages')
    .then((res) => {
      //use reduce to make an object with photos, create an array of comments, and remove repeat images. stored by their id in this object e.g. {1: {image1}, 2:{image2}}
      let commentedPhotos = res.data.reduce((obj, photo) => {
        if(!obj[photo.id]) {
          obj[photo.id] = photo;
          obj[photo.id].comments = [photo.comment];
          return obj;
        }
        obj[photo.id].comments.push(photo.comment);
        return obj;
      }, {})
      let photos = [];
      for(var photoObj in commentedPhotos){
        photos.push(commentedPhotos[photoObj]);
      }
      console.log(photos, 'commentedPhotos, action GET DASH IMAGES');
      return photos;
    }
  ).catch((error) => console.error(error));

  return {
    type: GET_DASH_IMAGES,
    payload: response
  }
}

export function commentOnDashImage(userId, comment, imageId, user_image_id) {
  console.log(userId, comment, 'COMMENT_ON_DASH_IMAGE action');
  let response = axios.post('/api/dashboardComment', {
    id: userId,
    comment,
    imageId,
    user_image_id
  })
    .then((res) => res.data)
    .catch((error) => console.error(error));

  return {
    type: COMMENT_ON_DASH_IMAGE,
    payload: response
  }
}
