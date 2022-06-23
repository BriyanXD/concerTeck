const initialState = {
  AllEvents: [],
  AllBigEvents: [],
  AllLitleEvents: [],
  Detail: {},
  User:{},
  BigEvents:[],
  Events:[],
  // Genres:[],
};

function reducers(state = initialState, {type, payload}) {
  switch (type) {
    case "GET_EVENTS":
      // console.log(payload)
      const BigE = payload.filter(e => e.isBigEvent === true)
      // console.log(BigE);
      const Eve = payload.filter(e => e.isBigEvent === false)
      // console.log(Eve);
      return {
        ...state,

        AllEvents: payload,
        AllBigEvents:BigE,
        BigEvents: BigE,
        AllLitleEvents:Eve,
        Events: Eve,
        
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
    case "FILTER_GENRES":{
        const generos = payload === 'all'? state.AllBigEvents: state.AllBigEvents.filter(e => e.genre.includes(payload))
        const generoso = payload === 'all'? state.AllLitleEvents: state.AllLitleEvents.filter(e => e.genre.includes(payload))
        console.log(generos);
        return{
          ...state,
          BigEvents: generos,
          Events: generoso
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
