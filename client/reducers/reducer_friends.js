import { GET_FRIENDS, ADD_FRIEND, SET_CURRENT_FRIEND, GET_FRIEND_IMAGES, GET_FRIEND_EVENTS, GET_FRIEND_FRIENDS } from '../constants/ActionTypes';

export function friends_Reducer(state = { allFriends: [], newFriends: [], currentFriend: {}, currentFriendImages: [], currentFriendEvents: [], currentFriendFriends: [] }, action) {
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
      return Object.assign({}, state, { currentFriend });

      case GET_FRIEND_IMAGES:
        let currentFriendImages = action.payload;
        return Object.assign({}, state, { currentFriendImages });

      case GET_FRIEND_EVENTS:
        let currentFriendEvents = action.payload;
        return Object.assign({}, state, { currentFriendEvents });

      case GET_FRIEND_FRIENDS:
        let currentFriendFriends = action.payload;
        return Object.assign({}, state, { currentFriendFriends });

    default:
      return state;
  }
}
