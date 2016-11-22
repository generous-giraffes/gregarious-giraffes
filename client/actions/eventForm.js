import axios from 'axios';
import * as types from '../constants/ActionTypes'

//action to be dispatched if getEventForm is successful
const getEventFormSuccess = (data) => {
    return {
        type: types.GET_EVENT_FORM,
        data: data
    }
};

const getShowEventSuccess = (data) => {
    return {
        type: types.SHOW_EVENT,
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
        type: types.SUBMIT_EVENT_FORM,
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
        type: types.ATTEND_EVENT,
        payload: response
    }
}

export function showEvent(userId) {
    return (dispatch) => {
        return axios.get(`/api/attendEvent?userid=${userId}`)
            .then((res) => {
              // console.log(res, 'respponse in action');//res.data is array of objects
                dispatch(getShowEventSuccess(res));
            })
            .catch((err) => console.error(err))
    }
}

export function searchEventsByUserName(userName) {
    let response = axios.get(`/api/searchEvents/user?userName=${userName}`)
      .then((res) => res.data)
      .catch((err) => console.error(err))

    return {
        type: types.SEARCH_EVENTS_BY_USER,
        payload: response
    }
}

export function searchEventsByEventName(eventName) {
    let response = axios.get(`/api/searchEvents/event?eventName=${eventName}`)
      .then((res) => res.data)
      .catch((err) => console.error(err))

    return {
        type: types.SEARCH_EVENTS_BY_EVENT_NAME,
        payload: response
    }
}
