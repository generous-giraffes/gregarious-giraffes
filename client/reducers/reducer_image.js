import { SUBMIT_PROFILE_IMAGE, GET_PROFILE_IMAGE, POST_USER_IMAGE, GET_USER_IMAGES } from '../constants/ActionTypes';

export function image_Reducer(state = { UserImages: [], profileImage: '' }, action) {
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

    default:
      return state;
  }
}
