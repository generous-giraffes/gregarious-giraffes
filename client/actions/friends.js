import axios from 'axios';

export const GET_FRIENDS = 'GET_FRIENDS';
export const ADD_FRIEND = 'ADD_FRIEND';
export const SET_CURRENT_FRIEND = 'SET_CURRENT_FRIEND';
export const GET_FRIEND_IMAGES = 'GET_FRIEND_IMAGES';
export const GET_FRIEND_EVENTS = 'GET_FRIEND_EVENTS';
export const GET_FRIEND_FRIENDS = 'GET_FRIEND_FRIENDS';

export function getFriends(id) {
  let response = axios.get('/api/users/friends?id=' + id)
    .then((res) => {
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
    .then((res) => res.data[0])
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

export function getFriendImages(id) {
  let response = axios.get('/api/users/friendsImages?id=' + id)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    type: GET_FRIEND_IMAGES,
    payload: response
  }
}

export function getFriendEvents(id) {
  let response = axios.get('/api/users/friendsEvents?id=' + id)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    type: GET_FRIEND_EVENTS,
    payload: response
  }
}

export function getFriendFriends(id) {
  let response = axios.get('/api/users/friendsFriends?id=' + id)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    type: GET_FRIEND_FRIENDS,
    payload: response
  }
}
