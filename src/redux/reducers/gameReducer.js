import {
    SAVE_NUM_DICE,
} from '../actions/gameActions';

export default function(state = {}, action) {
    switch (action.type) {
        case SAVE_NUM_DICE:
            return {
                numDice: action.numDice
            };
        default:
            return state
    }
}