import axios from 'axios';

// action: submission of the chat message

export const SUBMIT_CHAT = 'SUBMIT_CHAT';

export function submitMessage(data) {
  let response = axios.post('/api/chat', data)  // do we need to save chat messages in database????
    .then((res) => res.data[0])
    .catch((err) => console.error(err));
  return {
    type: SUBMIT_CHAT,
    payload: response
  }
}