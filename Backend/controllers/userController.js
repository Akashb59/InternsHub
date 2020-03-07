const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
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

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    status: 'Success',
    results: user.length,
    data: { user }
  });
});

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

exports.getUserById = catchAsync(async (req, res, next) => {
  console.log('hi');
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: { user }
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  /* const testUser = new User({
    name: 'User 1',
    age: 20
  });

  testUser
    .save()
    .then(doc => {
      console.log(doc);
    })
    .catch(err => {
      console.log('Error', err);
    }); */

  const newUser = catchAsync(await User.create(req.body));
  //User.findOne({_id:req.params.id})
  //console.log(req.body);
  res.status(201).json({
    status: 'Success',
    data: {
      User: newUser
    }
  });
});
exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: {
      user
    }
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(204).json({
    status: 'Success',
    data: {
      user
    }
  });
});
