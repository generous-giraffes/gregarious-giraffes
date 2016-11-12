import { combineReducers } from 'redux';
import { auth_Reducer } from './reducer_auth';
import { petApi_Reducer } from './reducer_petApi';
import { form_Reducer } from './reducer_form';
import { image_Reducer } from './reducer_image';


const rootReducer = combineReducers({
    getPets: petApi_Reducer,
    form: form_Reducer,
    image: image_Reducer,
    isAuthorized: auth_Reducer
});

export default rootReducer;
