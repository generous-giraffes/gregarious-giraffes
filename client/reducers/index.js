import { combineReducers } from 'redux';
import { auth_Reducer } from './reducer_auth';
import { petApi_Reducer } from './reducer_petApi';
import { form_Reducer } from './reducer_form';


const rootReducer = combineReducers({
    getPets: petApi_Reducer,
    form: form_Reducer,
    isAuthorized: auth_Reducer
});

export default rootReducer;
