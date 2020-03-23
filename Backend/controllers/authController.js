const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const slugify = require('slugify');
//const factory = require('./handlerFactory');

const { promisify } = require('util');
const User = require('./../models/userModel');
const userTypeMaster = require('./../models/userTypeMasterModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');

const signToken = id => {
  return jwt.sign(
    {
      id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );
};
const cookieOptions = {
  expires: new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  ),
  httpOnly: true
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  //Remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  let roleTypeObj;
  if ((await req.body.role) == 'Student') {
    //console.log(req.body.role);
    roleTypeObj = await userTypeMaster.findOne({
      roleName: 'Student'
    });
    roleType = roleTypeObj._id;
  } else if ((await req.body.role) == 'Company') {
    roleTypeObj = await userTypeMaster.findOne({
      roleName: 'Company'
    });
    roleType = roleTypeObj._id;
  } else if ((await req.body.role) == 'Admin') {
    roleTypeObj = await userTypeMaster.findOne({
      roleName: 'Admin'
    });
    roleName = roleTypeObj._id;
  } else if ((await req.body.role) == 'PlacementCell') {
    roleTypeObj = await userTypeMaster.findOne({
      roleName: 'PlacementCell'
    });
    roleType = roleTypeObj._id;
  }
  const slug = slugify(req.body.fullname);
  //console.log(roleType);
  //console.log(slug);
  const newUser = await User.create({
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    phoneNumber: req.body.phoneNumber,
    roleType,
    slug
  });
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password, role } = req.body;
  //1.Check if email and password exists
  if (!email || !password || !role) {
    return next(new AppError('Please provide email, role and password', 400));
  }
  let roleTypeObj, roleName;

  if ((await req.body.role) == 'Student') {
    roleTypeObj = await userTypeMaster.findOne({
      roleName: 'Student'
    });
    roleName = roleTypeObj._id;
  } else if ((await req.body.role) == 'Company') {
    roleTypeObj = await userTypeMaster.findOne({
      roleName: 'Company'
    });
    roleName = roleTypeObj._id;
  } else if ((await req.body.role) == 'Admin') {
    roleTypeObj = await userTypeMaster.findOne({
      roleName: 'Admin'
    });
    roleName = roleTypeObj._id;
  } else if ((await req.body.role) == 'PlacementCell') {
    roleTypeObj = await userTypeMaster.findOne({
      roleName: 'PlacementCell'
    });
    roleName = roleTypeObj._id;
  }
  //2.Check if users exists and password is correct
  const user = await User.findOne({
    email
  }).select('+password +roleType');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  //console.log(roleName, user.roleType._id);
  if (roleName != user.roleType.id) {
    return next(new AppError('Incorrect role', 401));
  }

  //3.If everything is ok, send token to client
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'logged out', {
    expires: new Date(Date.now + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({
    status: 'success'
  });
};

exports.isLoggedIn = async (req, res, next) => {
  //1.Verify token
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      //2.check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }
      //3.Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }
      //THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      res.locals.userType = currentUser.roleType.roleName;
      //console.log('hello', currentUser.roleType.roleName);
      return next();
    } catch (err) {
      return next();
    }
  }

  next();
};

exports.protect = catchAsync(async (req, res, next) => {
  //1.Get the token and check if it still exists
  let token;
  //console.log('hi1');
  //console.log(req, 'he1');
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.body.headers) {
    token = req.body.headers.jwt;
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (req.headers.jwt) {
    token = req.headers.jwt;
  }
  //console.log(token, 'he2');
  if (!token) {
    return next(
      new AppError('You are not logged in! Please login to get access', 401)
    );
  }
  //2.Verification of token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //3.Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError('The user belonging to the token no longer exists!', 401)
    );
  }
  //4.Check if user changed password after the token was issued
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again', 401)
    );
  }
  //Grant Access to protected route
  req.user = freshUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //Roles is an array ['admin', ''], student outside
    //console.log('hi2', roles);
    //console.log(req.user.roleType.roleName);
    if (!roles.includes(req.user.roleType.roleName)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1.Get user based on POSTed email
  const user = await User.findOne({
    email: req.body.email
  });
  if (!user) {
    return next(new AppError('There is no user with the email address.', 404));
  }
  //2.Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({
    validateBeforeSave: false
  });
  //3.Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit your PATCH request with your new password and confirm password to: ${resetURL}.\n If you didn't forget your password, please ignore this email!`;
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (Valid for only 10 minutes)',
      message
    });
    //console.log('pass2');
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({
      validateBeforeSave: false
    });
    return next(
      new AppError('There was an error sending email, try again later!', 500)
    );
  }
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  //1.Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: Date.now()
    }
  });

  //2.If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  //3.Update changedPasswordAt property for the user

  //4.Log the user in, send JWT
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  //1.Get user from the collection
  const user = await User.findById(req.user.id).select('+password');

  //2.Check if POSTed password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong', 401));
  }

  //3.If the password is correct, update the password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  //User.findByIdAndUpdate will NOT work as intended!

  //4.Log user in, send JWT
  createSendToken(user, 200, res);
});
