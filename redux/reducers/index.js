import { combineReducers } from "redux";
import user from './userReducers.js'
import charge from "./chargeReducers.js";
import language from "./languageReducers.js";

const rootReducer = combineReducers({
    user,
    charge,
    language,
})

export default rootReducer;