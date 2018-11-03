const mongoose = require('mongoose');
const landSchema = new mongoose.Schema({
    userName: { type: String, unique: true, required: true },
    quadKey: { type: String, required: true },
    dataLat: { type: String, required: true },
    dataLng: { type: String, required: true },
    sellPrice: { type: Number, default: 0, required: true },
    createdDate: { type: Date, default: Date.now }
});

landSchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('QuadKeysUser', landSchema);