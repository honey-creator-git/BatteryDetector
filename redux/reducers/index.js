import { combineReducers } from "redux";
import user from './userReducers.js'
import charge from "./chargeReducers.js";

const rootReducer = combineReducers({
    user,
    charge,
})

export default rootReducer;