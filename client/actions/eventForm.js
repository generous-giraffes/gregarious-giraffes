import axios from 'axios';

export const SUBMIT_EVENT_FORM = 'SUBMIT_EVENT_FORM';

export function submitEventForm(data) {
    console.log("this is submitting the event form", data);
    let response = axios.post('/api/eventForm', data)
        .then((res) => {
            console.log(res, 'this is res ==>>>>>> line 9 in eventForm ACTION', res)
            res.data[0];
        })
        .catch((err) => console.error(err));
    return {
        type: SUBMIT_EVENT_FORM,
        payload: response
    }
}