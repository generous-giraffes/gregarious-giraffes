import { GET_FRIENDS, ADD_FRIEND, SET_CURRENT_FRIEND } from '../actions/friends';

export function friends_Reducer(state = { allFriends: [], newFriends: [], currentFriend: {} }, action) {
  switch (action.type) {
    case GET_FRIENDS:
      let allFriends = action.payload;
      return Object.assign({}, state, { allFriends });

    case ADD_FRIEND:
      let newFriends = action.payload;
      let friends = [...state.allFriends, newFriends];
      return Object.assign({}, state, { allFriends:friends,newFriends });

    case SET_CURRENT_FRIEND:
      let currentFriend = action.payload;
      console.log(currentFriend, 'CURRENT FRIEND, friends reducer');
      return Object.assign({}, state, { currentFriend });
      
    default:
      return state;
  }
}
