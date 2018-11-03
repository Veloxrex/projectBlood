const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, unique: true, required: true },
    hash: { type: String, trim: true, required: true},
	email: { type: String, trim: true, index: true, unique: true, sparse: true  },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

userSchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('User', userSchema);