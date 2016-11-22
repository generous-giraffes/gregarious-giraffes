import axios from 'axios';
import * as types from '../constants/ActionTypes'

//action to be dispatched if getEventForm is successful
const getEventFormSuccess = (data) => {
    return {
        type: types.GET_EVENT_FORM,
        data: data
    }
};
//action to be dispatched if getShowEventSuccess is successful
const getShowEventSuccess = (data) => {
    return {
        type: types.SHOW_EVENT,
        data: data
    }
};

export function submitEventForm(data) {
    let response = axios.post('/api/eventForm', data)
        .then((res) => res.data[0])
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
        .then((res) => res.data[0])
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
