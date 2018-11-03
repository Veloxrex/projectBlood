import { chatRoomService } from '../services/chatRoomService'
import alertActions from './alertActions';
export const GETALL_CHATROOMS_REQUEST = 'GETALL_CHATROOMS_REQUEST';
export const GETALL_CHATROOMS_SUCCESS = 'GETALL_CHATROOMS_SUCCESS';
export const GETALL_CHATROOMS_FAILURE = 'GETALL_CHATROOMS_FAILURE';
export const JOIN_ROOM_REQUEST = 'JOIN_ROOM_REQUEST';
export const LEAVE_ROOM_REQUEST = 'LEAVE_ROOM_REQUEST';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';

export const chatRoomActions = {
    getAll,
    create,
    joinRoomRequest,
    leaveRoomRequest,
    uploadImage
};

function create(room){
    //console.log(room);
    return dispatch => {
        chatRoomService.create(room)
            .then(
                res =>{
                    dispatch(alertActions.success("Create room success"));
                },
                error => {
                    dispatch(alertActions.error(error));
                }
            );
    }
}

function getAll() {
    return dispatch => {
        chatRoomService.getAll()
            .then(
                chatRooms => {
                    dispatch(success(chatRooms));
                },
                error => {
                    dispatch(failure(error));
                }
            )
    };
    //function request() { return { type: GETALL_CHATROOMS_REQUEST } }
    function success(chatRooms) { return { type: GETALL_CHATROOMS_SUCCESS, chatRooms } }
    function failure(error) { return { type: GETALL_CHATROOMS_FAILURE, error } }
}

function joinRoomRequest(roomName) {
    return {
        type: JOIN_ROOM_REQUEST,
        roomName: roomName
    }
}

function leaveRoomRequest(roomName) {
    return {
        type: LEAVE_ROOM_REQUEST,
        roomName: roomName
    }
}

function uploadImage(selectedFile) {
    // return dispatch => {
    //     chatroomService.uploadImage(selectedFile)
    //         .then((data) => {
    //             console.log("Thanh cong");
    //             dispatch({ type: UPLOAD_IMAGE, data: 'test' });
    //         })
    // }
    return chatRoomService.uploadImage(selectedFile);
}




