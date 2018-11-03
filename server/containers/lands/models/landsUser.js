const mongoose = require('mongoose');

const landSchema = new mongoose.Schema({
    userName: { type: String, unique: true, required: true },
    tiles: { type: Number, required: true },
    lands: { type: Number, required: true },
    totalPay: { type: Number, required: true },
    createdDate: { type: Date, default: Date.now }
});

landSchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('LandsUser', landSchema);