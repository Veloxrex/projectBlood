const io = require('./../app').io;
const rpsService = require('./../containers/events/services');
const messageService = require('./../containers/messages/services');
const connectedUser = require('./connectedUser');


const socketHandle = (socket) => {


    socket.on("GET_EVENT_USERS_REQUEST", () => {
        rpsService.getEventUsersCount()
            .then(usersCount => io.emit("EVENT_USERS_COUNT", usersCount));
    });
    //User only connect when logged
    socket.on("USER_CONNECTED", userName => {
        connectedUser.pushUserToList(userName, socket.id);
        io.emit("ONLINE_USER", connectedUser.getUsers());
    });

    socket.on('SEND_MESSAGE', messObj => {
        let messageDB = {
            user: messObj.user,
            type: messObj.type,
            room: messObj.roomName,
            body: messObj.data
        };
        messageService.create(messageDB)
            .then(() => {
                messageService.getAllInRoom(messObj.roomName)
                    .then(messages => io.to(messObj.roomName).emit('CHAT_HISTORY', messages))
                    .catch(err => console.log(err))
            })
    });

    socket.on('JOIN_ROOM_REQUEST', roomName => {
        socket.join(roomName, () => {
            //get messages when join room
            messageService.getAllInRoom(roomName)
                .then(messages => io.to(roomName).emit('CHAT_HISTORY', messages))
                .catch(err => console.log(err))
            // send a render request to client
        });
    });

    socket.on('disconnect', () => {
        var removeSuccess = connectedUser.removeClientFromList(socket.id);
        if (removeSuccess) {
            io.emit("ONLINE_USER", connectedUser.getUsers());
        }
    });

    socket.on('USER_DISCONNECTED', (userName) => {
        var removeSuccess = connectedUser.removeUserFromList(userName);
        if (removeSuccess) {
            io.emit("ONLINE_USER", connectedUser.getUsers());
        }
        //console.log(connectedUser);
    });

    //  socket.broadcast()
};



module.exports = {
    socketHandle
};