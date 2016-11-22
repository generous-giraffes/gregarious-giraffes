import { GET_FRIENDS, ADD_FRIEND, SET_CURRENT_FRIEND, GET_FRIEND_IMAGES, GET_FRIEND_EVENTS, GET_FRIEND_FRIENDS } from '../constants/ActionTypes';

export function friends_Reducer(state = { allFriends: [], newFriends: [], currentFriend: {}, currentFriendImages: [], currentFriendEvents: [], currentFriendFriends: [], error: false, toast: false }, action) {
  switch (action.type) {

    case GET_FRIENDS:
      let allFriends = action.payload;
      return Object.assign({}, state, { allFriends });

    case ADD_FRIEND:
      //if the users were already friends then set error to true so a warning toaster appears from FriendSearchContainer
      if(action.payload === 'already friends') {
        return Object.assign({}, state, { error: true });
      }
      //if the users were not already friends then add the new friend data and set toast to true so a success toas appears from FriendSearchContainer
      let newFriends = action.payload;
      let friends = [...state.allFriends, newFriends];
      return Object.assign({}, state, { allFriends:friends,newFriends, toast: true });

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

      case 'REMOVE_ERROR':
        //remove the error so FriendSearchContainer does not keep creating a warning toast
        return Object.assign({}, state, { error: false, toast: false });

      case 'REMOVE_TOAST':
      //set toast to false so FriendSearchContainer does not keep creating a success toast
        return Object.assign({}, state, { error: false, toast: false });

    default:
      return state;
  }
}
