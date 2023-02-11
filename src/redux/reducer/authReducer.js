import {LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT} from '../actions/AuthActionType'
//const user = JSON.parse(localStorage.getItem("user")) 
const user = {}
const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null }

export default function (state = initialState, action){
    const { type, payload } = action
    switch (type){
        case LOGIN_SUCCESS:                        
            localStorage.setItem('user', JSON.stringify(payload));
            return {
                ...state,
                isLoggedIn: true,
                user: payload,
            };
        case LOGIN_FAIL:
            localStorage.removeItem('user')
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case LOGOUT:
            localStorage.removeItem('user')
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
        
    }
}