import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import { auth_Reducer } from './reducer_auth';
import { petApi_Reducer } from './reducer_petApi';


const rootReducer = combineReducers({
    routing: routeReducer,
    getPets: petApi_Reducer,
    isAuthorized: auth_Reducer
});

export default rootReducer;
