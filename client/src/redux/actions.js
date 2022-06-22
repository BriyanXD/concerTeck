import axios from 'axios';


export function getEvents() {
    return async function (dispatch) {
        try{
            let events = await axios.get("http://localhost:3001/api/events");
            return dispatch({
                type:'GET_EVENTS',
                payload: events.data
            })
        }catch(error){
            console.log(error.message);
        }
    }
}

export function searchEvent (name){
    return async function (dispatch) {
        try{
            const events = await axios.get(`http://localhost:3001/api/events?name=${name}`);
            return dispatch({
                type:'GET_EVENT_BY_NAME',
                payload: events.data
            })
        }catch(error){
            console.log(error.message);
        }   
    }
}

export function EventById (id) {
    return async function (dispatch){
        try{
            const event = await axios.get(`http://localhost:3001/events/${id}`);
            return dispatch({
                type:'GET_EVENT_DETAIL',
                payload: event.data
            });
        }catch(error){
            console.log(error)
        }
    }
}

export function CreateEvent (value){
    return async function (dispatch){
        try{
            const creation = await axios.post(`http://localhost:3001/api/events`, value)
            return creation;
        }catch(error){
            console.log(error.message);
        }
    }
}

export function ClearDetail (){
    return function (){
        return { type:'CLEAR_DETAIL'}
    }
} 

export function register (user,value) {
    return async function (dispatch){
        try{
            const register = await axios.post(`http://localhost:3001/api/${user}`, value);
            return register;
        }catch(error){
            console.log(error.message);
        }
    }
}

export function LoginUser (value){
    return async function (dispatch){
        try{
            const getUser = await axios.get("http://localhost:3001/api/login", value);
            return dispatch({
                type: "LOGIN_USER",
                payload: getUser.data,
            });
        }catch(error){
            console.log(error.message)
        }
    }
}   