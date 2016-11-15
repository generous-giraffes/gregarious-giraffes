import { GET_FRIENDS } from '../actions/friends';

export function friends_Reducer(state = { allFriends: [], newFriends: [] }, action) {
  switch (action.type) {
    case GET_FRIENDS:
      let allFriends = action.payload;
      return Object.assign({}, state, {allFriends});
    default:
      return state;
  }
}
