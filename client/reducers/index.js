import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import { auth_Reducer } from './reducer_auth';


const rootReducer = combineReducers({
    routing: routeReducer,
    isAuthorized: auth_Reducer
});

export default rootReducer;
