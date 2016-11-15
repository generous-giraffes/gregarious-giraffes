import { SUBMIT_EVENT_FORM } from '../actions/eventForm';

export function eventForm_Reducer(state = {}, action) {
    switch (action.type) {
        case SUBMIT_EVENT_FORM:
            console.log(action, 'action NEW EVENT form+++++++++');
            return Object.assign({}, state,
                {
                    time: action.payload.time,
                    date: action.payload.date,
                    location: action.payload.location,
                    gifts: action.payload.gifts,
                    danger: action.payload.danger,
                    animals: action.payload.animals,
                    eating: action.payload.eating
                });
        default:
            return state;
    }
}

