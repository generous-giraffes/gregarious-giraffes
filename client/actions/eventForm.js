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

//action to be dispatched if the user submits and event form
export function submitEventForm(data) {
    let response = axios.post('/api/eventForm', data)
        .then((res) => res.data[0])
        .catch((err) => console.error(err));
    return {
        type: types.SUBMIT_EVENT_FORM,
        payload: response
    }
}

//This action gets all the events for the EventList
export function getEvent() {
    return (dispatch) => {
        return axios.get('/api/eventForm')
            .then((res) => {
                dispatch(getEventFormSuccess(res));
            })
            .catch((err) => console.error(err))
    }
}

//This action allows a post to the attendEvent table that they are attending the event
//matching the user id along with the event id
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

//This action shows the event in the users profile as they are 'attending'
export function showEvent(userId) {
    return (dispatch) => {
        return axios.get(`/api/attendEvent?userid=${userId}`)
            .then((res) => {
                dispatch(getShowEventSuccess(res));
            })
            .catch((err) => console.error(err))
    }
}

//This action allows you to search for events by those attending in the eventList
export function searchEventsByUserName(userName) {
    let response = axios.get(`/api/searchEvents/user?userName=${userName}`)
      .then((res) => res.data)
      .catch((err) => console.error(err))

    return {
        type: types.SEARCH_EVENTS_BY_USER,
        payload: response
    }
}

//This action allows you to search for events by name in the eventList
export function searchEventsByEventName(eventName) {
    let response = axios.get(`/api/searchEvents/event?eventName=${eventName}`)
      .then((res) => res.data)
      .catch((err) => console.error(err))

    return {
        type: types.SEARCH_EVENTS_BY_EVENT_NAME,
        payload: response
    }
}
