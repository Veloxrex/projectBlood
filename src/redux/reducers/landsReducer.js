import {
    PURCHASE_REQUEST,
    PURCHASE_SUCCESS,
    PURCHASE_FAILURE,
    LANDS_GETALL_REQUEST,
    LANDS_GETALL_SUCCESS,
    LANDS_GETALL_FAILURE,
    LANDS_DELETE_REQUEST,
    LANDS_DELETE_SUCCESS,
    LANDS_DELETE_FAILURE
} from '../actions/landActions';

export default function(state = {}, action) {
    switch (action.type) {
        case PURCHASE_REQUEST:
            return {
                loading: true
            };
        case PURCHASE_SUCCESS:
            return {
                items: action.lands
            };
        case PURCHASE_FAILURE:
            return {
                error: action.error
            };
        case LANDS_GETALL_REQUEST:
            return {
                loading: true
            };
        case LANDS_GETALL_SUCCESS:
            return {
                items: action.lands
            };
        case LANDS_GETALL_FAILURE:
            return {
                error: action.error
            };
        case LANDS_DELETE_REQUEST:
            return {
                loading: true
            };
        case LANDS_DELETE_SUCCESS:
            return {
                items: action.lands
            };
        case LANDS_DELETE_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}