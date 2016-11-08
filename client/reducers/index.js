import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import { authReducer } from './reducer_auth';


const rootReducer = combineReducers({
    routing: routeReducer,
    isAuthorized: authReducer
});

export default rootReducer;
