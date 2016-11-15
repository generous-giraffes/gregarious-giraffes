import axios from 'axios';

export const GET_FRIENDS = 'GET_FRIENDS';

export function getFriends(id) {
  let response = axios.get('/api/users/friends?id=' + id)
    .then((res) => {
      console.log('response friends', res.data);
      let friends = res.data;
      return friends;
    })
    .catch((err) => console.log(err));

  return {
    type: GET_FRIENDS,
    payload: response
  }
}
