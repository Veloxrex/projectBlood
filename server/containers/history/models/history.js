const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    eventRecord: [
        {
            userName: { type: String },
            fightRecord: [
                {
                    isWin: { type: Boolean },
                    turn: { type: Number },
                    round: { type: Number },
                    rivalName: { type: String },
                    _id: false
                }
            ],
            _id: false
        }
    ],
    eventNo: { type: Number, required: true}
});

historySchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('History', historySchema);