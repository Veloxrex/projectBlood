const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    image: { type: String }
});

chatRoomSchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('ChatRoom', chatRoomSchema);