const UserTypeMaster = require('./../models/userTypeMasterModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllUserTypeMasters = catchAsync(async (req, res, next) => {
  //Execute Query
  const features = new APIFeatures(UserTypeMaster.find(), req.query)
    .filter()
    .sorter()
    .limitFields()
    .paginate();

  const userTypeMaster = await features.query;
  //Send Response
  res.status(200).json({
    status: 'Success',
    results: userTypeMaster.length,
    data: { userTypeMaster }
  });
});

exports.getUserTypeMasterById = catchAsync(async (req, res, next) => {
  const userTypeMaster = await UserTypeMaster.findById(req.params.id);
  if (!userTypeMaster) {
    return next(new AppError('No User type found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: { userTypeMaster }
  });
});

exports.createUserTypeMaster = catchAsync(async (req, res, next) => {
  const newUserTypeMaster = await UserTypeMaster.create(req.body);
  //UserTypeMaster.findOne({_id:req.params.id})
  console.log(req.body);
  res.status(201).json({
    status: 'Success',
    data: {
      UserTypeMaster: newUserTypeMaster
    }
  });
});
