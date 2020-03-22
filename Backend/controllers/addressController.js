const Address = require('./../models/addressModel');
const factory = require('./handlerFactory');

exports.getAllAddresses = factory.getAll(Address);
exports.getAddressById = factory.getOne(Address);
exports.createAddress = factory.createOne(Address);
exports.updateAddress = factory.updateOne(Address);
exports.deleteAddress = factory.deleteOne(Address);
