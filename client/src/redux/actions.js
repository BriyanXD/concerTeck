import axios from 'axios';


export function getEvents() {
    return async function (dispatch) {
        var events = await axios.get("http://localhost:3001/events");
        return dispatch({
            type:'GET_EVENTS',
            payload: events.data
        })
    }
}
