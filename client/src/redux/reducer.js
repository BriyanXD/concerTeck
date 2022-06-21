const initialState = {
  AllEvents: [],
  BigEvents: [],
  Events: [],
  Detail: {},
  User:{}
};

function reducers(state = initialState, {type, payload}) {
  switch (type) {
    case "GET_EVENTS":{
      return {
        ...state,
        AllEvents: payload,
      }
    } 
    // case "GET_EVENT_BY_NAME":{

    // }
    case "GET_EVENT_DETAIL": return {
      ...state,
      Detail: payload
    }

    case "CLEAR_DETAIL":{
      return {
        ...state,
        Detail:{}
      }
    }

    case "LOGIN_USER":{
      return {
        ...state,
        User: payload
      }
    }

    // case "LOGOUT":{
    //   return {
    //     ...state,
    //     User:{}
    //   }
    // }
  
    default:
      return state;
  }
}
export default reducers;
