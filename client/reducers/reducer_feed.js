import { GET_RECENT_USERS, GET_DASH_IMAGES, COMMENT_ON_DASH_IMAGE } from '../actions/feed';

export function feed_Reducer(state = { dashImages: [], users: [] }, action) {
  switch (action.type) {
      case GET_RECENT_USERS:
          let recentUsers = [
              ...state.users,
              ...action.data.data
          ];
          return Object.assign({}, state, {recentUsers});

      case GET_RECENT_USERS:
          let users = [
            ...state.users,
            ...action.data.data
          ];
          return Object.assign({}, state, {users});

      case GET_DASH_IMAGES:
          let prevNumDashImages = state.dashImages.length || 0;
          let newDashImages = action.payload.slice(prevNumDashImages);
          return Object.assign({}, state, {
            dashImages: [...state.dashImages, ...newDashImages]
          });

        case COMMENT_ON_DASH_IMAGE:
          let prevNumberDashImages = state.dashImages.length || 0;
          let commentedImages = action.payload.slice(prevNumberDashImages);
          return Object.assign({}, state, {
            dashImages: [...state.dashImages, ...commentedImages]
          });

      default:
          return state;
  }
}
