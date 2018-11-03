import {
    FETCH_MESSAGES,
    SEND_MESSAGE,
    UPDATE_USER_STATUS,
    USER_CONNECTED,
    USER_DISCONNECTED,
    EVENT_USERS_COUNT,
    EVENT_INITIAL,
    GET_EVENT_USERS_REQUEST
} from '../actions/socketActions';


import {
    JOIN_ROOM_REQUEST
} from '../actions/chatRoomActions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_MESSAGES:
            return {
                ...state,
                messages: action.messages,
                action: undefined
            };
        case SEND_MESSAGE:
            return {
                ...state,
                message: action.message,
                action: action
            };
        case JOIN_ROOM_REQUEST:
            return {
                ...state,
                roomName: action.roomName,
                action: action
            };
        case UPDATE_USER_STATUS:
            return {
                ...state,
                onlineUsers: action.onlineUsers,
                action: undefined
            };
        case USER_CONNECTED:
            return {
                ...state,
                user: action.user,
                action: action
            };
        case USER_DISCONNECTED:
            return {
                ...state,
                user: action.user,
                action: action
            };
        case GET_EVENT_USERS_REQUEST:
            return {
                ...state,
                action : action
            };
        default:
            return { ...state };

    }
}