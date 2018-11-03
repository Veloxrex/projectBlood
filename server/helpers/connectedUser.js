var connectedUser = [];

function getUsers() {
    return connectedUser;
}

function getUserClientsId(userName) {
    var user = connectedUser.find(u => {
        return u.userName === userName
    });

    if(!user){
        return null;
    }
    else{
        var clientsId = user.connectedClient.map(cl => {
            return cl;
        })
       
        return clientsId;
    }
    

}

function pushUserToList(userName, socketId) {
    let index = -1;
    //find user and handle result with index ( -1 : not found , !-1 : index of userArr)
    for (let i = 0; i < connectedUser.length; i++) {
        if (connectedUser[i].userName === userName) {
            index = i;
            break;
        }
    }
    // if user no exist
    if (index === -1) {
        let connectedClient = [];
        connectedClient.push(socketId);
        let user = {
            userName: userName,
            connectedClient: connectedClient
        };
        connectedUser.push(user);
    }
    else { // if user already exist
        let isExist = false;
        let _connectedClient = connectedUser[index].connectedClient;
        //only add diffrent client
        for (let i = 0; i < _connectedClient.length; i++) {
            if (_connectedClient[i] === socketId) {
                isExist = true;
                break;
            }
        }
        if (!isExist) {
            connectedUser[index].connectedClient.push(socketId);
        }
    }
}

function removeUserFromList(userName) {
    for (let i = 0; i < connectedUser.length; i++) {
        if (connectedUser[i].userName === userName) {
            connectedUser.splice(i, 1);
            return true;
        }
    }
    return false;
}

function removeClientFromList(socketId) {
    //decrease connectedClient of client login with user
    for (let i = 0; i < connectedUser.length; i++) {
        let connectedClientArr = connectedUser[i].connectedClient;
        for (let j = 0; j < connectedClientArr.length; j++) {
            if (connectedClientArr[j] === socketId) {
                connectedClientArr.splice(j, 1);
                break;
            }
        }
        if (connectedUser[i].connectedClient.length <= 0) {
            connectedUser.splice(i, 1);
            return true;
        }
    }
    return false;
}

module.exports = {
    getUsers,
    pushUserToList,
    removeUserFromList,
    removeClientFromList,
    getUserClientsId
}