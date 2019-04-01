import {combineReducers} from "redux"
import Auth from "./auth.js"
var allReducer = combineReducers({
    auth : Auth,
})

export default allReducer;