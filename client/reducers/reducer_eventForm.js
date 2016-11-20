import { SUBMIT_EVENT_FORM, GET_EVENT_FORM, ATTEND_EVENT, SHOW_EVENT, SEARCH_EVENTS_BY_USER, SEARCH_EVENTS_BY_EVENT_NAME } from '../actions/eventForm';
//can import * as type from ... then do type.SUBMIT_EVENT_FORM ....
export function eventForm_Reducer(state = { currentEvent: [], events: [], userEvents: [], searchedEvents: []}, action) {
    switch (action.type) {
        case SUBMIT_EVENT_FORM:
            console.log(action, 'action NEW EVENT form+++++++++');
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
        //the commented out code works but it is mutation of state, this way may be better
          let previousEvents = state.events.length || 0;
          let newEvents = action.data.data.slice(previousEvents);
          return Object.assign({}, state, {
              events: [...state.events, ...newEvents]
          });
            // console.log(action, 'action GETTING THE EVENTS form+++++++++');
            // let events = [
            //     // ...state.events, //this was causing repeats to be added, could use slice if the lenghts dont match up to not mutate state, but this works
            //     ...action.data.data
            // ];
            // return Object.assign({}, state, {events});

        case ATTEND_EVENT:
            let currentEvent = action.payload;
            return Object.assign({}, state, {currentEvent});

        case SHOW_EVENT:
            // console.log(action, "SHOWING THE EVENTS THAT THIS USER IS ATTENDING");
            // console.log(state.currentEvent, "is the current event messing it up because not in default");
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
