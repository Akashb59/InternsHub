const Address = require('./../models/addressModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllAddresses = catchAsync(async (req, res, next) => {
  //Execute Query
  const features = new APIFeatures(Address.find(), req.query)
    .filter()
    .sorter()
    .limitFields()
    .paginate();

  const address = await features.query;
  //Send Response
  res.status(200).json({
    status: 'Success',
    results: address.length,
    data: { address }
  });
});
exports.getAddressById = catchAsync(async (req, res, next) => {
  const address = await Address.findById(req.params.id);
  if (!address) {
    console.log('hey');
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: { address }
  });
});

exports.createAddress = catchAsync(async (req, res, next) => {
  const newAddress = await Address.create(req.body);
  //Intern.findOne({_id:req.params.id})
  //console.log(req.body);
  res.status(201).json({
    status: 'Success',
    data: {
      Address: newAddress
    }
  });
});

exports.updateAddress = catchAsync(async (req, res, next) => {
  const address = await Address.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
    //re validate for each update
  });
  if (!address) {
    //console.log('hey');
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: {
      address
    }
  });
});

exports.deleteAddress = catchAsync(async (req, res, next) => {
  const address = await Address.findByIdAndDelete(req.params.id);
  if (!address) {
    //console.log('hey');
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(204).json({
    status: 'Success',
    data: {
      address
    }
  });
});
