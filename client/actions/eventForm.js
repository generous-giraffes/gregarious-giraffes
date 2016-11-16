import axios from 'axios';

export const SUBMIT_EVENT_FORM = 'SUBMIT_EVENT_FORM';
export const GET_EVENT_FORM = 'GET_EVENT_FORM';
export const ADD_EVENT = 'ADD_EVENT';

//action to be dispatched if getEventForm is successful
const getEventFormSuccess = (data) => {
    return {
        type: GET_EVENT_FORM,
        data: data
    }
};

export function submitEventForm(data) {
    console.log("this is submitting the event form", data);
    let response = axios.post('/api/eventForm', data)
        .then((res) => {
            console.log(res, 'this is res ==>>>>>> line 9 in eventForm ACTION', res)
            return res.data[0];
        })
        .catch((err) => console.error(err));
    return {
        type: SUBMIT_EVENT_FORM,
        payload: response
    }
}

export function getEvent() {
    return (dispatch) => {
        return axios.get('/api/eventForm')
            .then((res) => {
                dispatch(getEventFormSuccess(res));
            })
            .catch((err) => console.error(err))
    }
}

export function addEvent(id, email) {
    let response = axios.post('/api/attendingEvents', {
            friendEmail: email,
            id: id
        })
        .then((res) => {
            console.log(res, 'added event success');
            return res.data[0];
        })
        .catch((err) => console.log(err));

    return {
        type: ADD_EVENT,
        payload: response
    }
}