const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../helpers/db');
const config = require('../../helpers/config');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    socialLogin
};

async function authenticate({ userName, password }) {
    const user = await User.findOne({ userName });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(param) {
    if (await User.findOne({ userName: param.userName })) {
        throw 'Username "' + param.userName + '" is already taken';
    }
    if (await User.findOne({ email: param.email })) {
        throw 'Email "' + param.email + '" is already taken';
    }
    const user = new User();

    user.userName = param.userName;
    user.firstName = param.firstName;
    user.lastName = param.lastName;
    // hash password
    if (param.password) {
        user.hash = bcrypt.hashSync(param.password, 10);
    }

    if (param.email.length > 0) {
        user.email = param.email;
        const message = {
            from: 'bloodlanddev',
            to:  param.email,
            subject: 'Blood land notification',
            text: 'thanks for use our app',
        };
        config.sendEmail(message);
    }
    await user.save();
}

async function update(id, param) {
    const user = await User.findById(id);
    if (!user) throw 'User not found';
    if (user.userName !== param.userName && await User.findOne({ userName: param.userName })) {
        throw 'Username "' + param.userName + '" is already taken';
    }
    // hash password if it was entered
    if (param.password) {
        param.hash = bcrypt.hashSync(param.password, 10);
    }
    // copy param properties to user
    Object.assign(user, param);
    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

async function socialLogin(user) {
    let userName = user.userName;
    const result = await User.findOne({ userName: userName });
    if (result) { // if user exist
        return { result: true, user: result }
    } else { // if user no exist
        return { result: false, user: null }
    }
}