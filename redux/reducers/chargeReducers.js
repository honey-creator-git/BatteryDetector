import { chargeConstants } from '../constants'

const INITIAL_STATE = {
    charges: [],
}

export default function charge(state = INITIAL_STATE, action) {
    switch (action.type) {
        case chargeConstants.SET_CHARGES:
            state.charges = action.chargeData;
            return state
        default:
            return state
    }
}