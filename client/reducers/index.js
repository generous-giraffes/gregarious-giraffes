import { combineReducers } from 'redux';
import { auth_Reducer } from './reducer_auth';
import { petApi_Reducer } from './reducer_petApi';
import { form_Reducer } from './reducer_form';
import { eventForm_Reducer } from './reducer_eventForm';
import { feed_Reducer } from './reducer_feed';
import { image_Reducer } from './reducer_image';
import { friends_Reducer } from './reducer_friends';
import { chat_Reducer } from './reducer_chat';

const rootReducer = combineReducers({
    getPets: petApi_Reducer,
    form: form_Reducer,
    eventForm: eventForm_Reducer,
    feedReducer: feed_Reducer,
    image: image_Reducer,
    isAuthorized: auth_Reducer,
    friends: friends_Reducer,
    chat: chat_Reducer
});

export default rootReducer;
