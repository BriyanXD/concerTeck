const initialState = {
  AllEvents: [],
  BigEvents: [],
  Events: [],
  Detail: {},
  User:{}
};

function reducers(state = initialState, {type, payload}) {
  switch (type) {
    case "GET_EVENTS":
      // console.log(payload)
      const BigE = payload.filter(e => e.isBigEvent === true)
      // console.log(BigE);
      const Eve = payload.filter(e => e.isBigEvent === false)
      console.log(Eve);
      return {
        ...state,
        AllEvents: payload,
        BigEvents: BigE,
        Events: Eve,
        
      }
    
     case "GET_EVENT_BY_NAME":{
      
      // const bigEvents = payload.filter(eve => eve.isBigEvent === true)
      // console.log(big)
      // const smallEvents = payload.filter(eve => eve.isBigEvent === false)

      return{
        ...state,
        BigEvents: payload,
        Events: payload

 
      }
     }
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
