import { SUBMIT_FORM } from '../actions/form';

export function form_Reducer(state = {}, action) {
  switch (action.type) {
    case SUBMIT_FORM:
    console.log(action, 'action form+++++++++');
      return Object.assign({}, state,
        {
          dob: action.payload.dob,
      		bloodType: action.payload.bloodType,
      		season: action.payload.season,
      		trained: action.payload.trained,
      		hobbies: action.payload.hobbies,
      		species: action.payload.species,
      		quote: action.payload.quote,
      		image: null
        });
    default:
      return state;
  }
}
