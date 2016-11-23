import { SUBMIT_EVENT_FORM, GET_EVENT_FORM, ATTEND_EVENT, SHOW_EVENT, SEARCH_EVENTS_BY_USER, SEARCH_EVENTS_BY_EVENT_NAME } from '../constants/ActionTypes';
//can import * as type from ... then do type.SUBMIT_EVENT_FORM ....
export function eventForm_Reducer(state = { currentEvent: [], events: [], userEvents: [], searchedEvents: []}, action) {
    switch (action.type) {
        case SUBMIT_EVENT_FORM:
            return Object.assign({}, state,
                {//why is all of this being put on state instead of having an object or array like currentEvent...
                    time: action.payload.time,
                    name: action.payload.name,
                    date: action.payload.date,
                    location: action.payload.location,
                    gifts: action.payload.gifts,
                    danger: action.payload.danger,
                    animals: action.payload.animals,
                    eating: action.payload.eating,
                    address: action.payload.address,
                    coordinates: action.payload.coordinates
                });
        case GET_EVENT_FORM:
        //this avoids the mutation of state
          let previousEvents = state.events.length || 0;
          let newEvents = action.data.data.slice(previousEvents);
          return Object.assign({}, state, {
              events: [...state.events, ...newEvents]
          });

        case ATTEND_EVENT:
            let currentEvent = action.payload;
            return Object.assign({}, state, {currentEvent});

        case SHOW_EVENT:
            let userEvents = [
                ...state.currentEvent,
                ...action.data.data
            ];
            return Object.assign({}, state, {userEvents});

        case SEARCH_EVENTS_BY_USER:
            return Object.assign({}, state, {searchedEvents: action.payload});

        case SEARCH_EVENTS_BY_EVENT_NAME:
            return Object.assign({}, state, {searchedEvents: action.payload});

        default:
            return state;
    }
}
