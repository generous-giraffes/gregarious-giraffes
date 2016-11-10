import { SUMBIT_FORM } from '../actions/form';

export function formReducer(state = {}, action) {
  switch (action.type) {
    case SUBMIT_FORM:
      return Object.assign({}, state,
        {
          dob: action.payload.data.dob,
      		bloodType: action.payload.data.bloodType,
      		season: action.payload.data.season,
      		trained: action.payload.data.trained,
      		hobbies: action.payload.data.hobbies,
      		species: action.payload.data.species,
      		quote: action.payload.data.quote,
      		image: null
        });
    default:
      return state;
  }
}
