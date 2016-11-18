import { GET_RECENT_USERS } from '../actions/feed';

export function feed_Reducer(state = {recentUsers: []}, action) {
    switch (action.type) {
        case GET_RECENT_USERS:
            let recentUsers = [
                ...state.users,
                ...action.data.data
            ];
            return Object.assign({}, state, {recentUsers});
        default:
            return state;
    }
}
