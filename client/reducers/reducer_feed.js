import { SHOW_USERS, GET_DASH_IMAGES, COMMENT_ON_DASH_IMAGE } from '../actions/feed';

export function feed_Reducer(state = { dashImages: [] }, action) {
  switch (action.type) {

    case SHOW_USERS:
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

    // case COMMENT_ON_DASH_IMAGE:
    //   let commentedImages = [...state.dashImages, ...action.payload];
    //   return Object.assign({}, state, { dashImages: commentedImages });

    default:
      return state;
  }
}
