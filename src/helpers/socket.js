import {EVENT_INITIAL, socketActions} from '../redux/actions/socketActions'
import {rpsActions} from '../redux/actions/rpsActions'
import { SEND_MESSAGE, USER_CONNECTED, USER_DISCONNECTED, GET_EVENT_USERS_REQUEST} from '../redux/actions/socketActions';
import { JOIN_ROOM_REQUEST } from '../redux/actions/chatRoomActions';
export default function (store, socket) {
    // all socket in here
    //nếu đã lưu user ở local
    const user = JSON.parse(localStorage.getItem("user"));
    if(user) {
        socket.emit("USER_CONNECTED", user.userName);
    }

    socket.on('EVENT_HISTORY',(history)=>{
        console.log(history); /// vuongmark
    })

    socket.on('WIN_ALERT',(userName)=>{
        console.log(userName);
        //teodangcodenha
    })

    socket.on('CHAT_HISTORY', (messages) => {
        store.dispatch(socketActions.fetchMessages(messages));
    });

    socket.on('ONLINE_USER',(onlineUsers) => {
        store.dispatch(socketActions.updateUserStatus(onlineUsers));

    });

    socket.on("GET_WINNER",(winner)=>{
        store.dispatch(socketActions.getWinner(winner));
    });

    socket.on("EVENT_USERS_COUNT",(usersCount)=>{
        store.dispatch(rpsActions.getUsersCount(usersCount));
    });

    socket.on("EVENT_INITIAL",()=>{
        store.dispatch(rpsActions.eventInitial());
    });

    //lang nghe moi khi dispatch 1 action va cap nhat lai store
    store.subscribe(() => {

        const action = store.getState().socket.action;

        if (action && action.type) {
            switch (action.type) {
                case SEND_MESSAGE:
                    return socket.emit('SEND_MESSAGE', action.message);
                case JOIN_ROOM_REQUEST:
                    return socket.emit('JOIN_ROOM_REQUEST', action.roomName);
                case USER_CONNECTED:
                    return socket.emit('USER_CONNECTED',action.user);
                case USER_DISCONNECTED:
                    return socket.emit('USER_DISCONNECTED',action.user);
                case GET_EVENT_USERS_REQUEST:
                    return socket.emit("GET_EVENT_USERS_REQUEST");
                default: break;
            }
        }
    })
}