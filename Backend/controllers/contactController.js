const catchAsync = require('./../utils/catchAsync');
const EmailAdmin = require('./../utils/emailAdmin');

exports.sendEmail = catchAsync(async (req, res, next) => {
  const user = {
    fullname: req.body.firstName + ' ' + req.body.lastName,
    message: req.body.message,
    emailInfo: req.body.email,
    phone: req.body.phone
  };
  //console.log(user);
  await new EmailAdmin(user).sendContact();
  res.status(200).json({
    status: 'Success',
    data: { user }
  });
});
