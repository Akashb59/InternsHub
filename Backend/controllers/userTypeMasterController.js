const UserTypeMaster = require('./../models/userTypeMasterModel');
const factory = require('./handlerFactory');

exports.getAllUserTypeMasters = factory.getAll(UserTypeMaster);
exports.getUserTypeMasterById = factory.getOne(UserTypeMaster);
exports.createUserTypeMaster = factory.createOne(UserTypeMaster);
