const mongoose = require('mongoose');

const rpsEventSchema = new mongoose.Schema({
    users: [{
        userName: { type: String},
        selectedRps: [Number],
        createdDate: { type: Date, default: Date.now },
        _id: false
    }],
    eventNo: { type: Number, required: true },
    winner: { type: String }
});

rpsEventSchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('RpsEvent', rpsEventSchema);