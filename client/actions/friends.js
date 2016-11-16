import axios from 'axios';

export const GET_FRIENDS = 'GET_FRIENDS';
export const ADD_FRIEND = 'ADD_FRIEND';
export const SET_CURRENT_FRIEND = 'SET_CURRENT_FRIEND';
export const LOAD_USERS = 'LOAD_USERS';

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

export function addFriend(id, email) {
  let response = axios.post('/api/users/friend', {
    friendEmail: email,
    id: id
   })
    .then((res) => {
      console.log(res, 'friended success');
      return res.data[0];
    })
    .catch((err) => console.log(err));

  return {
    type: ADD_FRIEND,
    payload: response
  }
}

export function setCurrentFriend(userInfo) {
  return {
    type: SET_CURRENT_FRIEND,
    payload: userInfo
  }
}
