import {LOGIN_SUCCESS,LOGOUT} from './AuthActionType'
import {setMsg,clearMsg} from './Msg'
import axios from 'axios';
const baseURL = process.env.REACT_APP_PRODUCTION_AUTH_URL ? process.env.REACT_APP_DEVELOPEMENT_AUTH_URL : 'http://localhost:9001/auth/';

export const login = (username, password) => (dispatch) => {    
    axios.post(baseURL+"login", {username :username,password : password,})
    .then((response)=>{        
        if (!response.data.error_state){
            //localStorage.setItem("user", JSON.stringify(response.data.data));
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: response.data.data },
            });
            dispatch(clearMsg())
        }
        else{
            dispatch({
                type: LOGOUT,
            })
            dispatch(setMsg('username or password incorrect'))
        }
    })    
}

export const logout = () => (dispatch) =>{    
    dispatch({
        type: LOGOUT,
    })
    dispatch(clearMsg())
    
}