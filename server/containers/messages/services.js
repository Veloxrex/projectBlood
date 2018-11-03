const db = require('../../helpers/db');
const Message = db.Message;

module.exports = {
    create,
    getAllInRoom
};

async function create(param) {
    const message = new Message(param);
    await message.save();
}

async function getAllInRoom(roomName){
    return await Message.find({room: roomName});
}
