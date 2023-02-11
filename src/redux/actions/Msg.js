import {SET_MESSAGE,CLEAR_MESSAGE} from './AuthActionType'

export const setMsg = (msg) => (dispatch) =>{
    dispatch({
        type : SET_MESSAGE,
        payload : msg
    })
}
export const clearMsg = () => (dispatch) =>{
    dispatch({
        type : CLEAR_MESSAGE
    })
}

