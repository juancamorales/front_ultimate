import { GET_ALL_EJERCISE, POST_EJERCISE, DELETE_EJERCISE, DETAIL, GET_ALL_NOVEDADES, POST_NOVEDADES, DELETE_NOVEDADES, DELETE_ENTRENAMIENTO, POST_ENTRENAMIENTO, GET_ALL_ENTRENAMIENTO, GET_EJERCISE, DETAIL_NOVEDAD, CLEAR, ORDER_BY_NAME, GET_NOVEDADES, ORDER_ENTRENAM } from "../actions/index";

const initialState = {
  ejercise: [],
  ejerciseCopy: [],
  mensage: {},
  ordeEntre: [],
  orEntre: [],
  mensage1: {},
  ejercis: {},
  novedades: [],
  novedadesCopy: [],
  mensage2: {},
  entrenamiento: [],
  entrenamientoCopy: [],
  novedad: {},
  ordeBy: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EJERCISE:
      return {
        ...state,
        ejercise: action.payload,
        ejerciseCopy: action.payload[0],
        ordeBy: action.payload[0],
      }
    case CLEAR:
      return {
        ...state,
        ejercis: {},
        novedad: {}
      }
    case GET_EJERCISE:
      return {
        ...state,
        ejercise: action.payload,
        ejerciseCopy: action.payload[0],
      }
    case GET_NOVEDADES:
      return {
        ...state,
        novedades: action.payload,
        novedadesCopy: action.payload[0]
      }
    case POST_EJERCISE:
      return {
        ...state,
        mensage: action.payload,
      }
    case DELETE_EJERCISE:
      return {
        ...state
      }
    case GET_ALL_ENTRENAMIENTO:
      return {
        ...state,
        entrenamiento: action.payload,
        entrenamientoCopy: action.payload[0],
        orderEntre: action.payload[0],
        orEntre: action.payload[0]
      }
    case POST_ENTRENAMIENTO:
      return {
        ...state,
        mensage2: action.payload,
      }
    case DELETE_ENTRENAMIENTO:
      return {
        ...state
      }
    case GET_ALL_NOVEDADES:
      return {
        ...state,
        novedades: action.payload,
        novedadesCopy: action.payload[0]
      }
    case POST_NOVEDADES:
      return {
        ...state,
        mensage1: action.payload,
      }
    case ORDER_ENTRENAM:
      if(state.orEntre.length > 0){
      const llData1 = state.orEntre.filter((i) => i.deporte === "atletismo")
      const llData2 = state.orEntre.filter((i) => i.deporte === "ultimate")
      const llData3 = state.orEntre.filter((i) => i.deporte === "disc-golf")
      if (action.payload === "disc-golf" && llData3) {
        return {
          ...state,
          entrenamientoCopy: llData3,
          entrenamiento: [llData3, { message: state.entrenamiento[1].message }]
        }
      } else if (action.payload === "ultimate" && llData2) {
        return {
          ...state,
          entrenamientoCopy: llData2,
          entrenamiento: [llData2, { message: state.entrenamiento[1].message }]
        }
      } else if (action.payload === "atletismo" && llData1) {
        return {
          ...state,
          entrenamientoCopy: llData1,
          entrenamiento: [llData1, { message: state.entrenamiento[1].message }]
        }
      }
    } else {
      return state
    }
    case DELETE_NOVEDADES:
      return {
        ...state
      }
    case DETAIL:
      return {
        ...state,
        ejercis: action.payload
      }
    case DETAIL_NOVEDAD:
      return {
        ...state,
        novedad: action.payload
      }
    case ORDER_BY_NAME:
      if(state.ordeBy.length > 0){
      const allData = state.ordeBy.filter((i) => i.tipo === "aeróbico")
      const allData1 = state.ordeBy.filter((i) => i.tipo === "flexibilidad")
      const allData2 = state.ordeBy.filter((i) => i.tipo === "fuerza")
      const allData3 = state.ordeBy.filter((i) => i.tipo === "resistencia")
      if (action.payload === "resistencia" && allData3) {
        return {
          ...state,
          ejerciseCopy: allData3,
          ejercise: [allData3, { message: state.ejercise[1].message }]
        }
      } else if (action.payload === "fuerza" && allData2) {
        return {
          ...state,
          ejerciseCopy: allData2,
          ejercise: [allData2, { message: state.ejercise[1].message }]
        }
      } else if (action.payload === "flexibilidad" && allData1) {
        return {
          ...state,
          ejerciseCopy: allData1,
          ejercise: [allData1, { message: state.ejercise[1].message }]
        }
      } else if (action.payload === "aeróbico" && allData) {
        return {
          ...state,
          ejerciseCopy: allData,
          ejercise: [allData, { message: state.ejercise[1].message }]
        }
      } 
    } else {
      return state
    }
    default:
      return state
  };
};

export default rootReducer;