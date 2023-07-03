import axios from "axios";
export const GET_ALL_EJERCISE = "GET_ALL_EJERCISE";
export const GET_EJERCISE = "GET_EJERCISE";
export const GET_NOVEDADES = "GET_NOVEDADES";
export const POST_EJERCISE = "POST_EJERCISE";
export const DELETE_EJERCISE = "DELETE_EJERCISE";
export const DETAIL = "DETAIL";
export const DETAIL_NOVEDAD = "DETAIL_NOVEDAD";
export const GET_ALL_NOVEDADES = "GET_ALL_NOVEDADES";
export const POST_NOVEDADES = "POST_NOVEDADES";
export const DELETE_NOVEDADES = "DELETE_NOVEDADES";
export const GET_ALL_ENTRENAMIENTO = "GET_ALL_ENTRENAMIENTO";
export const POST_ENTRENAMIENTO = "POST_ENTRENAMIENTO";
export const DELETE_ENTRENAMIENTO = "DELETE_ENTRENAMIENTO";
export const CLEAR = "CLEAR"
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_ENTRENAM = "ORDER_ENTRENAM";


export function getEjercise(name) {
    return async function(dispatch) {
        try {
        const res = await axios.get(`/ejercise?name=${name}`)
        return dispatch({
            type: GET_EJERCISE,
            payload: res.data,
        })
    } catch(error){
        console.log(error.message)
    }
    };
};

export function getNovedades(name) {
    return async function(dispatch) {
        try {
        const res = await axios.get(`/novedades?name=${name}`)
        return dispatch({
            type: GET_NOVEDADES,
            payload: res.data,
        })
    } catch(error){
        console.log(error.message)
    }
    };
};

export function getAllEjercise() {
    return async function (dispatch) {
        const res = await axios.get('/ejercise')
        return dispatch({
            type: GET_ALL_EJERCISE,
            payload: res.data
        });
    };
};

export function postEjercise() {
    return async function (dispatch) {
        const res = await axios.post('/ejercise')
        return dispatch({
            type: POST_EJERCISE,
            payload: res.data
        });
    };
};

export function deleteEjercise(id) {
    return async function (dispatch) {
        const res = await axios.put('/ejercise/'+id)
        return dispatch({
            type: DELETE_EJERCISE,
            payload: res.data
        });
    };
}

export function getAllNovedades() {
    return async function (dispatch) {
        const res = await axios.get('/novedades')
        return dispatch({
            type: GET_ALL_NOVEDADES,
            payload: res.data
        });
    };
};

export function postNovedades() {
    return async function (dispatch) {
        const res = await axios.post('/novedades')
        return dispatch({
            type: POST_NOVEDADES,
            payload: res.data
        });
    };
};

export function deleteNovedades(id) {
    return async function (dispatch) {
        const res = await axios.put('/novedades/'+id)
        return dispatch({
            type: DELETE_NOVEDADES,
            payload: res.data
        });
    };
}

export function getAllEntrenamiento() {
    return async function (dispatch) {
        const res = await axios.get('/entrenamiento')
        return dispatch({
            type: GET_ALL_ENTRENAMIENTO,
            payload: res.data
        });
    };
};

export function postEntrenamiento() {
    return async function (dispatch) {
        const res = await axios.post('/entrenamiento')
        return dispatch({
            type: POST_ENTRENAMIENTO,
            payload: res.data
        });
    };
};

export function deleteEntrenamiento(id) {
    return async function (dispatch) {
        const res = await axios.put('/entrenamiento/'+id)
        return dispatch({
            type: DELETE_ENTRENAMIENTO,
            payload: res.data
        });
    };
}

export function detail(iD) {
    return async function(dispatch) {
        try {
        const res = await axios.get(`/ejercise/${iD}`)
        return dispatch({
            type: DETAIL,
            payload: res.data
        }) 
    } catch(error){
        console.log(error.message)
    }
    }
};

export function detailNovedd(iD) {
    return async function(dispatch) {
        try {
        const res = await axios.get(`/novedades/${iD}`)
        return dispatch({
            type: DETAIL_NOVEDAD,
            payload: res.data
        }) 
    } catch(error){
        console.log(error.message)
    }
    }
};

export function clear() {
    return {
      type: CLEAR
    };
}

export function orderByName(payload) {
    return {
      type: ORDER_BY_NAME,
      payload,
    };
  }

  export function orderEntrenam(payload) {
    return {
      type: ORDER_ENTRENAM,
      payload,
    };
  }