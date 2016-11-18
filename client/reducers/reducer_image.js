import { SUBMIT_PROFILE_IMAGE, GET_PROFILE_IMAGE, POST_USER_IMAGE, GET_USER_IMAGES, GET_DASH_IMAGES,
COMMENT_ON_DASH_IMAGE } from '../actions/image';

export function image_Reducer(state = { UserImages: [], dashImages: [], profileImage: '' }, action) {
  switch (action.type) {

    case SUBMIT_PROFILE_IMAGE:
      return Object.assign({}, state, { profileImage: action.payload.uri });

    case GET_PROFILE_IMAGE:
      return Object.assign({}, state, { profileImage: action.payload[0].image });

    case POST_USER_IMAGE:
        let userImages = [...state.UserImages, action.payload];
        return Object.assign({}, state, { UserImages: userImages });

    case GET_USER_IMAGES:
        let prevNumUserImages = state.UserImages.length || 0;
        let newUserImages = action.payload.slice(prevNumUserImages);
        return Object.assign({}, state, {
          UserImages: [...state.UserImages, ...newUserImages]
        });

    case GET_DASH_IMAGES:
        let prevNumDashImages = state.dashImages.length || 0;
        let newDashImages = action.payload.slice(prevNumDashImages);
        return Object.assign({}, state, {
          dashImages: [...state.dashImages, ...newDashImages]
        });

    case COMMENT_ON_DASH_IMAGE:
        let commentedImages = [...state.dashImages, ...action.payload];
        return Object.assign({}, state, { UserImages: commentedImages });

    default:
      return state;
  }
}
