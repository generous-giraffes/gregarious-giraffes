import { SAVE_CHAT } from '../actions/chat';

// Set comment default since it's not there until first submission
const defaultState = {
  comments: []
};

export function chat_Reducer(state = defaultState, action) {
  switch (action.type) {
    case SAVE_CHAT:
      console.log(action, 'action chat+++++++++');
      // console.log('action payload=====:', action.payload.data)

      // If there's no payload, set empty array as default because payload can be empty
      const newComment = action.payload ? action.payload.data : [];
      return {
          ...state,
          // Adds new comment to the previous state's comments array
          comments: state.comments.concat(newComment)
        };
    default:
      return state;
  }
}
