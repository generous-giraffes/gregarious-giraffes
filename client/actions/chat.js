import axios from 'axios';

// action: submission of the chat message

export const SAVE_CHAT = 'SAVE_CHAT';
export const CHATS_RECEIVED = 'CHATS_RECEIVED';

const getChatSuccess = (data) => {
  console.log('+++object SUCCESSFUL RETRIEVAL', data);
    return {
        type: CHATS_RECEIVED,
        data: data
    }
};

export function saveChat(data) {
  // {comment: { text: 'text'}, user: {name: 'name'}}
  let response = axios.post('/api/chat', data)
    .then((res) => {
      console.log("**", res)
      res.data[0];
    })
    .catch((err) => console.error(err));

  return {
    type: SAVE_CHAT,
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
