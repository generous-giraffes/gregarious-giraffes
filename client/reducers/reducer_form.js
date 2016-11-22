import { SUBMIT_FORM } from '../constants/ActionTypes';

export function form_Reducer(state = {}, action) {
  switch (action.type) {
    case SUBMIT_FORM:
      return Object.assign({}, state,
        {
          dob: action.payload.dob,
      		bloodType: action.payload.bloodType,
      		season: action.payload.season,
      		trained: action.payload.trained,
      		hobbies: action.payload.hobbies,
      		species: action.payload.species,
      		quote: action.payload.quote,
      		image: null,
          id: action.payload.id
        });
    default:
      return state;
  }
}
