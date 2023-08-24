import { languageConstants } from "../constants";

const INITIAL_STATE = {
    languageCode: ''
}

export default function language(state = INITIAL_STATE, action) {
    switch (action.type) {
        case languageConstants.SET_LANGUAGE:
            state.languageCode = action.langCode
            return state
        default:
            return state
    }
}