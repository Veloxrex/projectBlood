const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    user: {
        userName : {type:String,required:true},
        avatar : {type:String,required:true}
    },
    type: {type: String,required:true},
    body: { type: String, required: true },
    room: {type: String,required:true},
    date: { type: Date, default: Date.now }
});

messageSchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Message', messageSchema);