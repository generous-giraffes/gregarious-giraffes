import { GET_RECENT_USERS, GET_DASH_IMAGES, COMMENT_ON_DASH_IMAGE } from '../actions/feed';

export function feed_Reducer(state = { dashImages: [], recentUsers: [] }, action) {
  switch (action.type) {

    case GET_RECENT_USERS:
        let prevRecentUsers = state.recentUsers.length || 0;
        let newestUsers = action.payload.slice(prevRecentUsers);
        return Object.assign({}, state, {
            recentUsers: [...state.recentUsers, ...newestUsers]
        });

      case GET_DASH_IMAGES:
          return Object.assign({}, state, {dashImages: action.payload});

      case COMMENT_ON_DASH_IMAGE:
        return Object.assign({}, state, {dashImages: action.payload});

      default:
          return state;
  }
}
