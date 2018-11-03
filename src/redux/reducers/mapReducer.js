import {
    UPDATE_CENTER,
    UPDATE_MOVABLES,
    GET_CURRENT,
    ADD_SELECTED,
    SAVE_NUM_DICE,
    // LANDS_GETALL_REQUEST,
    // LANDS_GETALL_SUCCESS,
    // LANDS_GETALL_FAILURE,
    // LANDS_DELETE_REQUEST,
    // LANDS_DELETE_SUCCESS,
    // LANDS_DELETE_FAILURE
} from '../actions/mapActions';

export default function(state = {}, action) {
    switch (action.type) {
        case UPDATE_CENTER:
            return {
                center: action.center
            };
        case UPDATE_MOVABLES:
            return {
                movables: action.movables
            };
        case GET_CURRENT:
            return {
                current: action.current
            };
        case ADD_SELECTED:
            //console.log('state: ', state.selected)
            //console.log('action: ', action.selected)
            let objSelected = {};
            if(action.selected){
                if(state.selected){
                    //console.log(state.selected)
                    if(state.selected.numDice > 0){
                        objSelected.numDice = state.selected.numDice - 1;
                        objSelected.char = state.selected.char;
                        objSelected.steps = [...state.selected.steps, action.selected];
                    }
                } else {
                    objSelected = {
                        numDice: action.selected.numDice,
                        char: action.selected.char,
                        steps: [{
                            tile: action.selected.tile,
                        }]
                    }
                }
            }
            //console.log(objSelected)
            //objSelected.push(action.selected);
            return {
                selected: objSelected
            };
        case SAVE_NUM_DICE:
            return {
                numDice: action.numDice
            };
        // case PURCHASE_SUCCESS:
        //     return {
        //         items: action.lands
        //     };
        // case PURCHASE_FAILURE:
        //     return {
        //         error: action.error
        //     };
        // case LANDS_GETALL_REQUEST:
        //     return {
        //         loading: true
        //     };
        // case LANDS_GETALL_SUCCESS:
        //     return {
        //         items: action.lands
        //     };
        // case LANDS_GETALL_FAILURE:
        //     return {
        //         error: action.error
        //     };
        // case LANDS_DELETE_REQUEST:
        //     return {
        //         loading: true
        //     };
        // case LANDS_DELETE_SUCCESS:
        //     return {
        //         items: action.lands
        //     };
        // case LANDS_DELETE_FAILURE:
        //     return {
        //         error: action.error
        //     };
        default:
            return state
    }
}