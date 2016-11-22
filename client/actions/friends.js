import axios from 'axios';
import * as types from '../constants/ActionTypes'

export function getFriends(id) {
  let response = axios.get('/api/users/friends?id=' + id)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    type: types.GET_FRIENDS,
    payload: response
  }
}

export function addFriend(id, email) {
  let response = axios.post('/api/users/addFriend', {
    friendEmail: email,
    id: id
   })
    .then((res) => res.data[0])
    .catch((err) => console.log(err));

  return {
    type: types.ADD_FRIEND,
    payload: response
  }
}

export function setCurrentFriend(userInfo) {
  return {
    type: types.SET_CURRENT_FRIEND,
    payload: userInfo
  }
}

export function getFriendImages(id) {
  let response = axios.get('/api/users/friendsImages?id=' + id)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    type: types.GET_FRIEND_IMAGES,
    payload: response
  }
}

export function getFriendEvents(id) {
  let response = axios.get('/api/users/friendsEvents?id=' + id)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    type: types.GET_FRIEND_EVENTS,
    payload: response
  }
}

export function getFriendFriends(id) {
  let response = axios.get('/api/users/friendsFriends?id=' + id)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    type: types.GET_FRIEND_FRIENDS,
    payload: response
  }
}

export function removeFriend(friend_id, user_id) {
  let response = axios.get(`/api/users/removeFriend?friendId=${friend_id}&userId=${user_id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    type: types.GET_FRIENDS,
    payload: response
  }
}
