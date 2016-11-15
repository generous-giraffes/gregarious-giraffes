import { GET_FRIENDS } from '../actions/friends';

export function friends_Reducer(state = { friends: [] }, action) {
  switch (action.type) {
    case GET_FRIENDS:
    console.log(action.payload, 'action friends payload+++++++++');
      return Object.assign({}, state,
        {
          friends: action.payload// [...friends, action.payload]
        });
    default:
      return state;
  }
}
