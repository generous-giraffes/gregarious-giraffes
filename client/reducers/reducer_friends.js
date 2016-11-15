import { GET_FRIENDS } from '../actions/friends';

export function friends_Reducer(state = { allFriends: [], newFriends: [] }, action) {
  switch (action.type) {
    case GET_FRIENDS:
    console.log(action.payload, 'action friends payload+++++++++');
      // let prevNofFriends = state.allFriends.length;
      // let newFriends = state.allFriends.slice(prevNofFriends);
      let allFriends = action.payload;
      return Object.assign({}, state, {allFriends});

    default:
      return state;
  }
}
