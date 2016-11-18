import axios from 'axios';


export const GET_DASH_IMAGES = 'GET_DASH_IMAGES';
export const COMMENT_ON_DASH_IMAGE = 'COMMENT_ON_DASH_IMAGE';
export const GET_RECENT_USERS = 'GET_RECENT_USERS';


export function getRecentUsers(id) {
    let response = axios.get('/api/dashboardUsers/' + id)
        .then((res) => {
            let recentUsers = res.data;
            return recentUsers;
        })
        .catch((err) => console.log(err));

    return {
        type: GET_RECENT_USERS,
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
