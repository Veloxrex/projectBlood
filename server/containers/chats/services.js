const db = require('../../helpers/db');
const ChatRoom = db.ChatRoom;
module.exports = {
   getAll,
   create
};
async function getAll() {
  return await ChatRoom.find();
}
async function create(param) {
    if (await ChatRoom.findOne({ name: param.name })) {
        throw 'This room "' + param.name + '" is already taken';
    }
    const room = new ChatRoom(param);
    return await room.save();
}