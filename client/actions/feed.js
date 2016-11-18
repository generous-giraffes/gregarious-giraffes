import axios from 'axios';

export const GET_RECENT_USERS = 'GET_USERS';

export function getRecentUsers(id) {
    let response = axios.get('/api/dashboardUsers/' + id)
        .then((res) => {
            let recentUsers = res.data;
            return recentUsers;
        })
        .catch((err) => console.log(err));

    return {
        type: GET_RECENT_USERS,
        payload: response
    }
}
