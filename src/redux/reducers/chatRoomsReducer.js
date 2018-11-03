import {
    //GETALL_CHATROOMS_REQUEST,
    GETALL_CHATROOMS_SUCCESS,
    //GETALL_CHATROOMS_FAILURE,
    JOIN_ROOM_REQUEST
} from '../actions/chatRoomActions';

export default function (state = {}, action) {
    switch (action.type) {
        case GETALL_CHATROOMS_SUCCESS : {
            return {
                chatRooms : action.chatRooms
            }
        }
        case JOIN_ROOM_REQUEST : {
            return {
                chatRooms : state.chatRooms,
                currentRoom : action.roomName
            }
        }
        // case JOIN_ROOM_REQUEST:
        // return {
        //     chatrooms: state.chatrooms,
        //     chatroom : action.roomname,
        // }
        default:
            return state
    }
}
