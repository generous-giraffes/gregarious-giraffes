import { SHOW_USERS } from '../actions/feed';

export function feed_Reducer(state = {users: []}, action) {
    switch (action.type) {
        case SHOW_USERS:
            let users = [
                ...state.users,
                ...action.data.data
            ];
            return Object.assign({}, state, {users});
        default:
            return state;
    }
}
