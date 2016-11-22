import axios from 'axios';
import * as types from '../constants/ActionTypes'

//retrieve friends for signed in user's profile
export function getFriends(id) {
  let response = axios.get('/api/users/friends?id=' + id)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    type: types.GET_FRIENDS,
    payload: response
  }
}

//add a friend for the signed in user from the dashboard SearchFriendsContainer, handle error for if the users tried to friend someone they are already friends with(server sends back a 500 which will trigger .catch)
export function addFriend(id, email) {
  let response = axios.post('/api/users/addFriend', {
    friendEmail: email,
    id: id
   })
    .then((res) => res.data[0])
    .catch((err) => 'already friends');

  return {
    type: types.ADD_FRIEND,
    payload: response
  }
}

//used in friendSearchContainer and FriendsContainer to set the currentFriend to populate the friend's profile with data if the user choosed to view their profile
export function setCurrentFriend(userInfo) {
  return {
    type: types.SET_CURRENT_FRIEND,
    payload: userInfo
  }
}

//invoked when the friendImageContainer is mounted to retrieve the friend's photos
export function getFriendImages(id) {
  let response = axios.get('/api/users/friendsImages?id=' + id)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    type: types.GET_FRIEND_IMAGES,
    payload: response
  }
}

//invoked when the friendImageContainer is mounted to retrieve the friend's events
export function getFriendEvents(id) {
  let response = axios.get('/api/users/friendsEvents?id=' + id)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    type: types.GET_FRIEND_EVENTS,
    payload: response
  }
}

//invoked when the friendImageContainer is mounted to retrieve the friend's friends
export function getFriendFriends(id) {
  let response = axios.get('/api/users/friendsFriends?id=' + id)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    type: types.GET_FRIEND_FRIENDS,
    payload: response
  }
}

//invoked in FriendsContainer to remove a friend
export function removeFriend(friend_id, user_id) {
  let response = axios.get(`/api/users/removeFriend?friendId=${friend_id}&userId=${user_id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    type: types.GET_FRIENDS,
    payload: response
  }
}

//an action to remove the error for friendSearchContainer so that the warning toaster stops
export function removeError() {
  return {
    type: 'REMOVE_ERROR',
    payload: ''
  }
}

//an action to remove the error for friendSearchContainer so that the success toast stops
export function removeToast() {
  return {
    type: 'REMOVE_TOAST',
    payload: ''
  }
}
