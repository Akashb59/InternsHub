const Enquiry = require('../models/enquiryModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.getEnquiryByIdCompany = catchAsync(async (req, res, next) => {
  const enquiry = await Enquiry.find({ company: req.params.id });
  //console.log(enquiry);
  if (!enquiry) {
    //console.log('hey');
    return next(new AppError('No Enquiry found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: { enquiry }
  });
});

exports.getAllEnquiries = factory.getAll(Enquiry);
exports.getEnquiryById = factory.getOne(Enquiry);
exports.createEnquiry = factory.createOne(Enquiry);
exports.updateEnquiry = factory.updateOne(Enquiry);
exports.deleteEnquiry = factory.deleteOne(Enquiry);
