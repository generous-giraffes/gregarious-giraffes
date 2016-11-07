import { combineReducers } from 'redux';
import UserReducer from './reducer_user';
import ValidateUserFieldsReducer from './reducer_validateUserFields';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    user: UserReducer,
    validateFields: ValidateUserFieldsReducer,
    form: formReducer // <-- redux-form
});

export default rootReducer;
