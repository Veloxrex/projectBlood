const _ = require('lodash');
const db = require('../../helpers/db');
const LandsUser = db.LandsUser;
const QuadKeysUser = db.QuadKeysUser;

module.exports = {
    purchase,
    getAll,
    delete: _delete
};

async function purchase(param)
{
    var quadKeys = param.quadKeys;
    for (var i = 0; i < quadKeys.length; i++)
    {
        await QuadKeysUser.deleteMany({$or: [{$and: [{userName: param.userName}, {quadKey: { $regex: quadKeys[i].quadKey }}]},{$and: [{sellPrice: { $gt: 0 }}, {quadKey: { $regex: quadKeys[i].quadKey }}]}]});
        var quadKeysUser = new QuadKeysUser(_.merge({userName: param.userName},quadKeys[i]));
        await quadKeysUser.save();
    }

    var landsUser = await LandsUser.findOne({ userName: param.userName });

    if (!landsUser) landsUser = new LandsUser(param);
    else Object.assign(landsUser, param);
    await landsUser.save();

    return await QuadKeysUser.find({userName: param.userName});
}


async function _delete(id) {
    await QuadKeysUser.findByIdAndRemove(id);
}

async function getAll(param) {
    return await QuadKeysUser.find(param).sort( { quadKey: -1 } );
}