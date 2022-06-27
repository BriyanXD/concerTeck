import axios from "axios";

export function getEvents() {
  return async function (dispatch) {
    try {
      let events = await axios.get("http://localhost:3001/api/events");
      return dispatch({
        type: "GET_EVENTS",
        payload: events.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function searchEvent(name) {
  return async function (dispatch) {
    try {
      const events = await axios.get(
        `http://localhost:3001/api/events?name=${name}`
      );
      return dispatch({
        type: "GET_EVENT_BY_NAME",
        payload: events.data,
      });
    } catch (error) {
      // alert('NO SE ENCONTRO EL EVENTO')
      return dispatch({
        type: "GET_EVENT_BY_NAME",
        payload: [],
      });
      // console.log(error.message);
    }
  };
}

export function EventById(id) {
  return async function (dispatch) {
    try {
      const event = await axios.get(
        `http://localhost:3001/api/events?id=${id}`
      );
      // console.log(id)
      return dispatch({
        type: "GET_EVENT_DETAIL",
        payload: event.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function CreateEvent (value){
    console.log(value)
    return async function (dispatch){
        try{
            const creation = await axios.post("http://localhost:3001/api/events", value)
            console.log(creation.data, "creando")
            return creation;
        }catch(error){
            console.log(error.message);
        }
    }
};


export function GetGenres() {
  return async function (dispatch) {
    try {
      const genres = await axios.get("http://localhost:3001/api/genres");
      return dispatch({
        type: "GET_GENRES",
        payload: genres.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function CreateGenre (value){
    return async function (dispatch){
        try{
            const creation = await axios.post("http://localhost:3001/api/genres", value)
            return creation;
        }catch(error){
            console.log(error.message);
        }
    }
};


export function GetVenues() {
  return async function (dispatch) {
    try {
      const venues = await axios.get("http://localhost:3001/api/venues");
      return dispatch({
        type: "GET_VENUES",
        payload: venues.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function ClearDetail() {
  return function () {
    return { type: "CLEAR_DETAIL" };
  };
}

export function register(user, value) {
  return async function (dispatch) {
    try {
      const register = await axios.post(
        `http://localhost:3001/api/${user}`,
        value
      );
      return register;
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function LoginUser(value) {
  return async function (dispatch) {
    try {
      const getUser = await axios.post(
        `http://localhost:3001/api/login`,
        value
      );
      return dispatch({
        type: "LOGIN_USER",
        payload: getUser.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function LogOut() {
  return async function (dispatch) {
    try {
      return dispatch({
        type: "LOGOUT_USER",
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function ValidationUser(value) {
  return async function (dispatch) {
    try {
      const user = await axios.post(
        `http://localhost:3001/api/validation/login`,
        value
      );
      return dispatch({
        type: "VALIDATION_LOGIN",
        payload: user.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function ValidationEmail(value) {
  return async function (dispatch) {
    try {
      const email = await axios.post(
        `http://localhost:3001/api/validation/email`,
        { email: value }
      );
      return dispatch({
        type: "VALIDATION_EMAIL",
        payload: email.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function ValidationUsername(value) {
  return async function (dispatch) {
    try {
      const username = await axios.post(
        `http://localhost:3001/api/validation/username`,
        { username: value }
      );
      console.log(username.data, "desde el actions");
      return dispatch({
        type: "VALIDATION_USERNAME",
        payload: username.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function filterByGenres(payload) {
  console.log(payload);
  return {
    type: "FILTER_GENRES",
    payload,
  };
}

export function OrderByDate(payload) {
  console.log(payload);
  return {
    type: "ORDER_BY_DATE",
    payload,
  };
}

export function ModalCalendarVisible(booleanForVisible, dateFor) {
  return {
    type: "MODAL_CALENDAR_VISIBLE",
    payload: {
      visibleModal: booleanForVisible,
      dateForSearch: dateFor,
    },
  };
}

// export function filterByGenres (){
//     return async(dispatch) => {
//         const gen = await axios.get('http://localhost:3001/api/genres')
//         return{
//             type:"FILTER_GENRES"
//         }
//     }
// }
