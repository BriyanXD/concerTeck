import axios from "axios";
const url = "http://localhost:3001";

export function getEvents() {
  return async function (dispatch) {
    try {
      let events = await axios.get(`${url}/api/events`);
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
      const events = await axios.get(`${url}/api/events?name=${name}`);
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
  console.log("🚀 ~ file: actions.js ~ line 38 ~ EventById ~ id", id);
  return async function (dispatch) {
    try {
      const event = await axios.get(`${url}/api/events?id=${id}`);
      console.log("🚀 ~ file: actions.js ~ line 42 ~ event", event.data);
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
      const creation = await axios.post(`${url}/api/events`, value);
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
      const genres = await axios.get(`${url}/api/genres`);
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
      const creation = await axios.post(`${url}/api/genres`, value);
      return creation;
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function GetVenues() {
  return async function (dispatch) {
    try {
      const venues = await axios.get(`${url}/api/venues`);
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
      const creation = await axios.post(`${url}/api/venues`, value);
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
      const register = await axios.post(`${url}/api/user`, value);
      localStorage.setItem("token", register.data[2].token);
      // console.log(register.data[2].token, "datos de usuario")
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
      const getUser = await axios.post(`${url}/api/login`, value);
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
      const user = await axios.post(`${url}/api/validation/login`, value);
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
      const email = await axios.post(`${url}/api/validation/email`, {
        email: value,
      });
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
      const username = await axios.post(`${url}/api/validation/username`, {
        username: value,
      });
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

export function getLikes(idUser) {
  return async function (dispatch) {
    try {
      const allLikes = await axios.get(`${url}/api/like?idUser=${idUser}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return dispatch({
        type: "GET_ALL_LIKES",
        payload: allLikes.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function postLikes(idEvent, idUser, allLikes) {
  return async function (dispatch) {
    const findLikes = allLikes.find((el) => el.idEvent === idEvent);
    if (findLikes) {
      console.log("Ya existe");
      return;
    }
    try {
      const getLikes = await axios.post(
        `${url}/api/like`,
        { idEvent: idEvent, idUser: idUser },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return dispatch({
        type: "POST_LIKES",
        payload: getLikes.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function deleteLikes(id) {
  return async function (dispatch) {
    try {
      const deleteLikes = await axios.delete(`${url}/api/like?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return dispatch({
        type: "DELETE_LIKES",
        payload: deleteLikes,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getAllUsers() {
  return async function (dispatch) {
    try {
      let config = {
        method: "get",
        url: `${url}/api/user`,
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
      const adminState = await axios.get(`${url}/api/producers`);
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
      const adminState = await axios.post(`${url}/api/Solicits`, {
        Headers: {
          authorization: "",
        },
      });
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
      const userDeleted = await axios.delete(`${url}/api/user?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
      const eventDeleted = await axios.delete(`${url}/api/events?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
        `${url}/api/upgrade`,
        { isAdmin: boolean, id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(userRanked, "Usuario Modificado ");
      return dispatch({
        type: "USER_RANKED",
        payload: userRanked,
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

export function searchUserByUserName(username) {
  return async function (dispatch) {
    try {
      const userByUserName = await axios.get(
        `${url}/api/user?username=${username}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(userByUserName.data, "ESTOY RE LCOO");
      return dispatch({
        type: "SEARCH_USER_BY_USERNAME",
        payload: userByUserName.data,
      });
    } catch (error) {
      console.log(error, "SOY YO");
    }
  };
}

export function findUser2(allusers, id) {
  const userSaved = allusers.find((user) => user.id === id);
  return {
    type: "FIND_USER_2",
    payload: userSaved,
  };
}

export function activeModalEventsAdminPanel(booleano) {
  return {
    type: "MODAL_EVENT_ADMIN_PANEL",
    payload: booleano,
  };
}
export function activeModalUsersAdminPanel(booleano) {
  return {
    type: "MODAL_USERS_ADMIN_PANEL",
    payload: booleano,
  };
}
export function activeModalUsersPermisedAdminPanel(booleano) {
  return {
    type: "MODAL_USERS_PERMISED_ADMIN_PANEL",
    payload: booleano,
  };
}

export function addCartDB(data) {
  return async function () {
    try {
      await axios.post(`${url}/api/cart`, data);
    } catch (error) {
      console.log(error);
    }
  };
}
export function findEventByName(name) {
  return async function (dispatch) {
    try {
      const eventos = await axios.get(`${url}/api/events?name=${name}`);
      console.log("ESTA PRUEBA NUEVA", eventos.data);
      return dispatch({
        type: "FIND_EVENT_BY_NAME",
        payload: eventos.data,
      });
    } catch (error) {
      // alert('NO SE ENCONTRO EL EVENTO')
      // return dispatch({
      //   type: "FIND_EVENT_BY_NAME",
      //   payload: [],
      // });
      console.log(error.message);
    }
  };
}

export function getCartDB(idUser) {
  return async function (dispatch) {
    try {
      const getCartDB = await axios.get(`${url}/api/cart?idUser=${idUser}`);
      return dispatch({
        type: "GET_CART_EVENT",
        payload: getCartDB.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteCart(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`${url}/api/cart?id=${id}`);
      return dispatch({
        type: "DELETE_CART",
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function putCartDB(value) {
  console.log("ENTRANDO 111", value);
  return async function (dispatch) {
    try {
      await axios.put(`${url}/api/cart`, value);
      console.log("ENTRANDO 2222");
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllBlackList() {
  return async function (dispatch) {
    try {
      const getAllBlackListData = await axios.get(`${url}/api/blackall`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return dispatch({
        type: "GET_ALL_BLACK_LIST",
        payload: getAllBlackListData.data,
      });
    } catch (error) {
      console.log(error, "GET_ALL_BLACK_LIST");
    }
  };
}

export function deleteUserBlackList(idUser) {
  return async function (dispatch) {
    try {
      const dataUser = await axios.delete(`${url}/api/black?id=${idUser}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(dataUser.data, "USUARIO PERDONADO");
      return dispatch({
        type: "DELETE_USER_BLACK_LIST",
        payload: dataUser.data,
      });
    } catch (error) {
      console.log(error, "DELETE_USER_BLACK_LIST");
    }
  };
}
export function getAllLikesEventId(idEvent) {
  return async function (dispatch) {
    try {
      const allLikesEventId = await axios.get(
        `${url}/api/like?idEvent=${idEvent}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return dispatch({
        type: "GET_ALL_LIKES_EVENT_ID",
        payload: allLikesEventId.data,
      });
    } catch (error) {
      console.log(error, "GET_ALL_LIKES_EVENT_ID");
    }
  };
}

export function putUrlStreamingEvent(urlStreaming, idEvent) {
  return async function (dispatch) {
    try {
      const putUrlStreaming = await axios.put(
        `${url}/api/eventurl`,
        {
          urlStraming: urlStreaming,
          idEvent: idEvent,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return dispatch({
        type: "PUT_URL_STREAMING_FOR_EVENT",
        payload: putUrlStreaming.data,
      });
    } catch (error) {
      console.log(error, "PUT_URL_STREAMING_FOR_EVENT");
    }
  };
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
