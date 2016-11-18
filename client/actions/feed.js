import axios from 'axios';

export const GET_USERS = 'GET_USERS';

export function getUsers(id) {
    let response = axios.get('/api/users/' + id)
        .then((res) => {
            let users = res.data;
            return users;
        })
        .catch((err) => console.log(err));

    return {
        type: GET_USERS,
        payload: response
    }
}
