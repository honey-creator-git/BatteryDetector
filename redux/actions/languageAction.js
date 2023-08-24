import { languageConstants } from "../constants";

export const languageActions = {
    setLanguage
}

function setLanguage(langCode) {
    return dispatch => {
        dispatch({ type: languageConstants.SET_LANGUAGE, langCode: langCode })
    }
}