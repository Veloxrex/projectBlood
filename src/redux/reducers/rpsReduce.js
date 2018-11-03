import {
    RPS_CREATE_SUCCESS ,
    RPS_CREATE_FAILURE ,

    RPS_FINDUSER_SUCCESS,
    RPS_FINDUSER_FAILURE,

    RPS_GETALL_REQUEST,
    RPS_GETALL_SUCCESS,
    RPS_GETALL_FAILURE,

    EVENT_INITIAL

} from '../actions/rpsActions';

import {
    GET_WINNER,
    EVENT_USERS_COUNT
} from '../actions/socketActions'

export default function(state = {}, action) {
    switch (action.type) {
        case RPS_CREATE_SUCCESS:
        console.log(action);
            return {
                event: action.event
            };
        case RPS_CREATE_FAILURE:
            return {
                error: action.error
            };
        case RPS_FINDUSER_SUCCESS:
            console.log(action);
            return {
                event: action.event
            };
        case RPS_FINDUSER_FAILURE:
            return {
                error: action.error
            };

        case RPS_GETALL_REQUEST:
            return {
                loading: true
            };
        case RPS_GETALL_SUCCESS:
            return {
                items: action.items
            };
        case RPS_GETALL_FAILURE:
            return {
                error: action.error
            };
        case GET_WINNER:
            return {
                ...state,
                winner: action.winner
            };
        case EVENT_USERS_COUNT:
            return{
                ...state,
                event : {
                    eventJoined : state.event.eventJoined,
                    usersCount : action.usersCount
                }
            };
        case EVENT_INITIAL:
            return {
                ...state,
                event : {
                    eventJoined: false,
                    usersCount : 0
                }
            }
        default:
            return state
    }
}