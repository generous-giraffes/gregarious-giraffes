import axios from 'axios';

export const GET_USERS = 'GET_USERS';
export const GET_DASH_IMAGES = 'GET_DASH_IMAGES';
export const COMMENT_ON_DASH_IMAGE = 'COMMENT_ON_DASH_IMAGE';

export function getUsers(id) {
    let response = axios.get('/api/users/' + id)
        .then((res) => {
            let users = res.data;
            return users;
        })
        .catch((err) => console.log(err));

    return {
        type: GET_USERS,
        payload: response
    }
}

export function getDashboardImages() {
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
