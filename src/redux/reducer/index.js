import {combineReducers} from 'redux'
import auth from './authReducer'
import msg from './msgReducer'
export default combineReducers({auth,msg})