import axios from "axios";
import { useLocalStorage } from "../components/useLocalStorage/useLocalStorage";

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

export function CreateEvent(value) {
  console.log(value);
  return async function (dispatch) {
    try {
      const creation = await axios.post(
        "http://localhost:3001/api/events",
        value
      );
      console.log(creation.data, "creando");
      return creation;
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function GetGenres() {
  return async function (dispatch) {
    try {
      const genres = await axios.get("http://localhost:3001/api/genres");
      // console.log(genres.data);
      return dispatch({
        type: "GET_GENRES",
        payload: genres.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function CreateGenre(value) {
  return async function (dispatch) {
    try {
      const creation = await axios.post(
        "http://localhost:3001/api/genres",
        value
      );
      return creation;
    } catch (error) {
      console.log(error.message);
    }
  };
}

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

export function CreateVenue(value) {
  return async function (dispatch) {
    try {
      const creation = await axios.post(
        "http://localhost:3001/api/venues",
        value
      );
      return creation;
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

export function register(value) {
  return async function (dispatch) {
    try {
      const register = await axios.post(
        `http://localhost:3001/api/user`,
        value
      );
      localStorage.setItem("token", register.data[2].token);
      return dispatch({
        type: "LOGIN_USER",
        payload: register.data[1],
      });
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
      console.log(getUser.data, "USUARIOS");
      localStorage.setItem("token", getUser.data[2].token);
      // console.log(localStorage.getItem('token'),'ESTE ES EL MUDF TOKEN')
      // setCookies(getUser.data[2].token)
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

export function AddToBasket(payload) {
  return {
    type: "ADD_TO_BASKET",
    payload: payload,
  };
}

export function getAllUsers() {
  return async function (dispatch) {
    try {
      let config = {
        method: "get",
        url: "http://localhost:3001/api/user",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      let token = localStorage.getItem("token");
      /* console.log(token); */
      /* const encabezado = `Authorization: Bearer ${localStorage.getItem('token')}` */

      const adminState = await axios(config);
      console.log(adminState.data);
      return dispatch({
        type: "GET_ALL_USERS",
        payload: adminState.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getAllProducers() {
  return async function (dispatch) {
    try {
      const adminState = await axios.get("http://localhost:3001/api/producers");
      return dispatch({
        type: "GET_ALL_PRODUCERS",
        payload: adminState.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getAllSolicits() {
  return async function (dispatch) {
    try {
      const adminState = await axios.get("http://localhost:3001/api/events");
      console.log(adminState.data, "adminstate");
      return dispatch({
        type: "GET_ALL_SOLICITS",
        payload: adminState.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function findUser(allusers, id) {
  const userSaved = allusers.find((user) => user.id === id);
  return {
    type: "FIND_USER",
    payload: userSaved,
  };
}
export function findEvent(allEvents, id) {
  const eventSave = allEvents?.find((event) => event.id === id);
  return {
    type: "FIND_EVENT",
    payload: eventSave,
  };
}

export function deleteUser(id) {
  return async function (dispatch) {
    try {
      const userDeleted = await axios.delete(
        `http://localhost:3001/api/user?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Ususario eliminado", userDeleted);
      return dispatch({
        type: "DELETE_USER",
        payload: userDeleted.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
export function deleteEvents(id) {
  return async function (dispatch) {
    try {
      console.log(id);
      const eventDeleted = await axios.delete(
        `http://localhost:3001/api/events?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(eventDeleted);
      return dispatch({
        type: "DELETE_EVENT",
        payload: eventDeleted,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
export function upgradeRank(id, boolean) {
  return async function (dispatch) {
    try {
      console.log(boolean, "admin estado");
      console.log(id, "id user");
      const userRanked = await axios.put(
        `http://localhost:3001/api/upgrade`,
        { isAdmin: boolean, id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return dispatch({
        type: "USER_RANKED",
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

// export function searchUserByName (name){
//   return async function(dispatch){
//     try {
//       const userByName = await axios.get(`http://localhost:3001/api/user?name=${name}`, {headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       }}) ;
//       console.log(userByName, 'ESTOY RE LCOO')
//       return dispatch({
//         type : "SEARCH_USER_BY_NAME",
//         payload :userByName.data
//       })
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

export function searchUserByUserName (username){
  return async function(dispatch){
    try {
      const userByUserName = await axios.get(
        `http://localhost:3001/api/user?username=${username}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );;
      console.log(userByUserName, 'ESTOY RE LCOO')
      return dispatch({
        type : "SEARCH_USER_BY_USERNAME",
        payload :userByUserName.data.username
      })
    } catch (error) {
      console.log(error,'SOY YO')
    }
  }
}

/* export function getAllSolicits(allevents) {
  return async function (dispatch) {
    try {
      console.log("EVENTOS", allevents);
      const filtersEvent = allevents.filter((event) => {
        if (!event.isAprobe) return event;
        else return;
      });
      return dispatch({
        type: "GET_ALL_SOLICITS",
        payload: filtersEvent,
      });
    } catch (error) {
      console.log(error.message, error);
    }
  };
} */

// export function filterByGenres (){
//     return async(dispatch) => {
//         const gen = await axios.get('http://localhost:3001/api/genres')
//         return{
//             type:"FILTER_GENRES"
//         }
//     }
// }
