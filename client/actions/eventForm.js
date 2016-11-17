import axios from 'axios';

export const SUBMIT_EVENT_FORM = 'SUBMIT_EVENT_FORM';
export const GET_EVENT_FORM = 'GET_EVENT_FORM';
export const ATTEND_EVENT = 'ATTEND_EVENT';
export const SHOW_EVENT = 'SHOW_EVENT';

//action to be dispatched if getEventForm is successful
const getEventFormSuccess = (data) => {
    return {
        type: GET_EVENT_FORM,
        data: data
    }
};

const getShowEventSuccess = (data) => {
    return {
        type: SHOW_EVENT,
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

export function attendEvent(event_id, user_id) {
    let response = axios.post('/api/attendEvent', {
            event_id: event_id,
            user_id: user_id
        })
        .then((res) => {
            console.log(res, 'added event success');
            return res.data[0];
        })
        .catch((err) => console.log(err));

    return {
        type: ATTEND_EVENT,
        payload: response
    }
}

export function showEvent(eventId, userId) {
    return (dispatch) => {
        return axios.get(`/api/attendEvent?userid=${userId}&eventid=${eventId}`)
            .then((res) => {
                dispatch(getShowEventSuccess(res));
            })
            .catch((err) => console.error(err))
    }
}
