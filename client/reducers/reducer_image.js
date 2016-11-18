import { PROFILE_IMAGE, POST_USER_IMAGE, GET_USER_IMAGE } from '../actions/image';

export function image_Reducer(state = { UserImages: [] }, action) {
  switch (action.type) {

    case PROFILE_IMAGE:
      return Object.assign({}, state, { image: action.payload.uri });

    case POST_USER_IMAGE:
      console.log('IMAGE SUBMIT REDUCER USER_IMAGE +++++',action.payload);
        let userImages = [...state.UserImages, action.payload];
        return Object.assign({}, state, { UserImages: userImages });

    case GET_USER_IMAGE:
      console.log('IMAGE SUBMIT REDUCER USER_IMAGE +++++',action.payload);
        let fetchedImages = [...state.UserImages, ...action.payload];
        return Object.assign({}, state, { UserImages: fetchedImages });

    default:
      return state;
  }
}
