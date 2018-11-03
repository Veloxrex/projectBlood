export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const UPDATE_USER_STATUS = 'UPDATE_USER_STATUS';
export const USER_CONNECTED = 'USER_CONNECTED';
export const USER_DISCONNECTED = 'USER_DISCONNECTED';
export const GET_WINNER = 'GET_WINNER';
export const EVENT_USERS_COUNT = 'EVENT_USERS_COUNT';
export const EVENT_INITIAL = 'EVENT_INITIAL';
export const GET_EVENT_USERS_REQUEST = 'GET_EVENT_USERS_REQUEST';
export const socketActions = {
    fetchMessages,
    sendMessage,
    updateUserStatus,
    userConnected,
    userDisconnected,
    getWinner
};

function userDisconnected(user){
    return {
        type : USER_DISCONNECTED,
        user : user
    }
}

function userConnected(user) {
    return {
        type: USER_CONNECTED,
        user: user
    }
}

function updateUserStatus(onlineUsers) {
    return {
        type: UPDATE_USER_STATUS,
        onlineUsers: onlineUsers
    }
}

function fetchMessages(messages) {
    return {
        type: FETCH_MESSAGES,
        messages: messages
    }
}

function sendMessage(message) {
    return {
        type: SEND_MESSAGE,
        message: message
    }
}

function getWinner(winner){
    return {
        type: GET_WINNER,
        winner : winner
    }
}
