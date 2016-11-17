import axios from 'axios';

// action: submission of the chat message

export const SAVE_CHAT = 'SAVE_CHAT';

export function saveChat(data) {
  let response = axios.post('/api/chat', data)
    .then((res) => res.data[0])
    .catch((err) => console.error(err));
  return {
    type: SAVE_CHAT,
    payload: data.comments
  }
}