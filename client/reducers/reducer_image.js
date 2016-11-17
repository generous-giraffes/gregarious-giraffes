import { SUBMIT_IMAGE } from '../actions/image';

export function image_Reducer(state = {}, action) {
  switch (action.type) {
    case SUBMIT_IMAGE:
    console.log('IMAGE SUBMIT REDUCER +++++payload',action.payload);
      return Object.assign({}, state,
        {
      		image: action.payload.image
        });
    default:
      return state;
  }
}
