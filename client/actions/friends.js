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

export function loadUsers() {
    let offset = this.state.offset > this.state.max ? 0 : this.state.offset;
    let response = axios.post('/api/users', {offset: offset})
        .then((res) => {
            let nextOffset = offset + 10;
            let users = res.data;
            this.setState({users: users, offset: nextOffset});
        })
        .catch((err) => console.log(err));
    return {
        type: LOAD_USERS,
        payload: response
    }
}
export function getMax() {
    console.log('getting max');
    axios.get('/api/users/count')
        .then((res) => {
            console.log(res.data, 'response data');
            let count = res.data[0]["count(`name`)"];
            this.setState({max: count});
        })
        .catch((err) => console.log(err))
}
