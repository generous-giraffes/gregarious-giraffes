import { SUBMIT_CHAT } from '../actions/chat';

// reducer for chat

export function chat_Reducer(state = {}, action) {
  switch (action.type) {
    case SUBMIT_CHAT:
    console.log(action, 'action chat+++++++++');
    console.log('action payload=====:', action.payload.data)
      return Object.assign({}, state,
        {
          message: action.payload.data
        });
    default:
      return state;
  }
}
