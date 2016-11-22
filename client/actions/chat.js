import axios from 'axios';
import * as types from '../constants/ActionTypes'

// action: submission of the chat message

const getChatSuccess = (data) => {
  console.log('+++object SUCCESSFUL RETRIEVAL', data);
    return {
        type: types.CHATS_RECEIVED,
        data: data
    }
};

export function saveChat(data) {
  let response = axios.post('/api/chat', data)
    .then((res) => {
      console.log("**", res)
      res.data[0];
    })
    .catch((err) => console.error(err));

  return {
    type: types.SAVE_CHAT,
    payload: response
  }
}

export function getChats() {
    return (dispatch) => {
        return axios.get('/api/chat')
            .then((res) => {
                dispatch(getChatSuccess(res.data));
            })
            .catch((err) => console.error(err))
    }
}
