const initialState = {
  AllEvents: [],
  AllBigEvents: [],
  AllLitleEvents: [],
  Detail: {},
  User:"",
  // TodosEvents:[],
  BigEvents:[],
  Events:[],
  Genres:[],
  Venues:[],
  userValidation: "",
  emailValidation: "",
  usernameValidation: ""
};

function reducers(state = initialState, {type, payload}) {
  switch (type) {
    case "GET_EVENTS":
      // console.log(payload)
      const BigE = payload.filter(e => e.venue.isBigEvent === true)  
      // (e => e.isBigEvent === true)
      // console.log(BigE);
      const Eve = payload.filter(e => e.venue.isBigEvent === false)
      // payload.filter(e => e.isBigEvent === false)
      // console.log(Eve);
      return {
        ...state,

        AllEvents: payload,
        // TodosEvents:payload,
        AllBigEvents:BigE,
        BigEvents: BigE,
        AllLitleEvents:Eve,
        Events: Eve,
      }
      case 'GET_GENRES':{
        // console.log(payload)
        return{
          ...state,
          Genres:payload
        }
      }
    
     case "GET_EVENT_BY_NAME":{
      
      const bigEvents = payload.filter(e => e.venue.isBigEvent === true)
      // console.log(payload)
      const smallEvents = payload.filter(e => e.venue.isBigEvent === false)

      return{
        ...state,
        BigEvents: bigEvents,
        Events: smallEvents
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
        User: payload,
        userValidation:""
      }
    }

    case "LOGOUT_USER":{
      return {
        ...state,
        User: ""
      }
    }
    // case "FILTER_GENRES":{
    //   return {
    //   }
    // }
    case "FILTER_GENRES":{
      // console.log(state.AllEvents)
      // console.log(payload)
        const generos = payload === 'all'? state.AllBigEvents: state.AllBigEvents.filter(e => parseInt(e.genreId) === parseInt(payload))
        // console.log(generos)
        const generoso = payload === 'all'? state.AllLitleEvents: state.AllLitleEvents.filter(e =>  parseInt(e.genreId) === parseInt(payload))
        // console.log(generoso);
        // const prueba = state.AllLitleEvents.filter(e => e.name === e.name)
        // console.log(prueba)
        return{
          ...state,
          BigEvents: generos,
          Events: generoso
        }
    }
    case 'ORDER_BY_DATE':
        // if(state.AllEvents.venue.isBigEvent === true){
            let reubicacionByDate = payload === 'asc' ?
            state.AllEvents.sort(function(a, b){
                if(a.schedule > b.schedule){
                    return 1;
                }
                if(b.schedule > a.schedule){
                    return -1;
                }
                    return 0;
                }) 
                : 
            state.AllEvents.sort(function(a, b){
                if(a.schedule > b.schedule){
                    return -1;
                }
                if(b.schedule > a.schedule){
                    return 1;
                }
                    return 0;
                }) 
                // console.log(reubicacionByDate)
                return {
                      ...state,
                      Events: reubicacionByDate.filter(e => e.venue.isBigEvent === false) ? reubicacionByDate.filter(e => e.venue.isBigEvent === false) : state.AllLitleEvents,
                      BigEvents: reubicacionByDate.filter(e => e.venue.isBigEvent === true) ? reubicacionByDate.filter(e => e.venue.isBigEvent === true) : state.AllBigEvents,
                    // ...state,
                    // AllEvents: payload === 'all'?  state.TodosEvents  : reubicaciónByDate
                }

    // case "LOGOUT":{
    //   return {
    //     ...state,
    //     User:{}
    //   }
    // }
    case "POST_EVENT": return {
      ...state
    }
    case "GET_GENRES": return {
        ...state,
        Genres: payload
    }
    case "POST_GENRE": return {
      ...state
    }
    case "GET_VENUES": console.log(payload)
     return {
        ...state,
        Venues: payload
    }
    case "VALIDATION_LOGIN": return{
      ...state,
      userValidation: payload
    }
    case "VALIDATION_EMAIL": return{
      ...state,
      emailValidation: payload
    }
    case "VALIDATION_USERNAME": return{
      ...state,
      usernameValidation: payload
    }
  
    default:
      return state;
  }
}
export default reducers;
