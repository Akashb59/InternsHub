const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

/* exports.checkID = (req, res, next, val) => {
  console.log(`User id is ${val}`);
  if (req.params.id * 1 > Users.length) {
    return req.status(404).json({
      status: 'fail',
      message: 'invalid ID'
    });
  }
  next();
}; */
/* exports.checkBody = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing Name'
    });
  }
  next();
}; */

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  //1.Create error if user POSTs password data
  if (req.body.password || req.body.passwordconfirm) {
    return next(
      new AppError(
        'This route is not for password updates, Please use updateMyPassword',
        400
      )
    );
  }
  //2.Filtered out unwanted field names that are not allowed to update
  const filteredBody = filterObj(req.body, 'fullname', 'email');

  //3.Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getAllUsers = factory.getAll(User);
exports.getUserById = factory.getOne(User);
exports.createUser = factory.createOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
