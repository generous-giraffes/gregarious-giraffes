import { combineReducers } from 'redux';
import { auth_Reducer } from './reducer_auth';
import { petApi_Reducer } from './reducer_petApi';


const rootReducer = combineReducers({
    getPets: petApi_Reducer,
    isAuthorized: auth_Reducer
});

export default rootReducer;
