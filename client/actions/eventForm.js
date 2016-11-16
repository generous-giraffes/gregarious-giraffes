import axios from 'axios';

export const SUBMIT_EVENT_FORM = 'SUBMIT_EVENT_FORM';
export const GET_EVENT_FORM = 'GET_EVENT_FORM';
export const ATTEND_EVENT = 'ATTEND_EVENT';

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
//
//export function showEvent(event_id, user_id) {
//    let response = (res) => {
//        return axios.get('/api/attendEvent')
//            .then((res) => res )
//            .catch((err) => console.error(err))
//    }
//    return {
//        type: SHOW_EVENT,
//        payload: response
//    }
//}
