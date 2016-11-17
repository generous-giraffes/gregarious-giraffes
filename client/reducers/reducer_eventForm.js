import { SUBMIT_EVENT_FORM, GET_EVENT_FORM, ADD_EVENT } from '../actions/eventForm';

export function eventForm_Reducer(state = { events: [] }, action) {
    switch (action.type) {
        case SUBMIT_EVENT_FORM:
            console.log(action, 'action NEW EVENT form+++++++++');
            return Object.assign({}, state,
                {
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
            console.log(action, 'action GETTING THE EVENTS form+++++++++');
            let events = [
                ...state.events,
                ...action.data.data
            ];
            return Object.assign({}, state, {events});
        case ADD_EVENT:
            let allEvents = [
                ...state.events,
                ...action.data.data
            ];
            let currentUser = [
                ...state.users
            ]
            return Object.assign({}, state, {allEvents}, {currentUser});
        default:
            return state;
    }
}
