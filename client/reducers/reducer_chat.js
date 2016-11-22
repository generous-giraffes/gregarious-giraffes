import { SAVE_CHAT, CHATS_RECEIVED } from '../constants/ActionTypes';

// Set comment default since it's not there until first submission
const defaultState = {
  comments: []
};

export function chat_Reducer(state = defaultState, action) {
  switch (action.type) {
    case SAVE_CHAT:
      // If there's no payload, set empty array as default because payload can be empty
      const newComment = action.payload ? action.payload.data : [];
      return {
          ...state
        };

      case CHATS_RECEIVED:
        return {
          ...state,
          comments: action.data.data ? action.data.data : []
        }
    default:
      return state;
  }
}
