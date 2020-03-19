const Enquiry = require('../models/enquiryModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllEnquiries = catchAsync(async (req, res, next) => {
  //Execute Query
  const features = new APIFeatures(Enquiry.find(), req.query)
    .filter()
    .sorter()
    .limitFields()
    .paginate();

  const enquiry = await features.query;
  //Send Response
  res.status(200).json({
    status: 'Success',
    results: enquiry.length,
    data: { enquiry }
  });
});

exports.getEnquiryById = catchAsync(async (req, res, next) => {
  const enquiry = await Enquiry.findById(req.params.id);
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

exports.getEnquiryByIdCompany = catchAsync(async (req, res, next) => {
  const enquiry = await Enquiry.find({ company: req.params.id });
  console.log(enquiry);
  if (!enquiry) {
    //console.log('hey');
    return next(new AppError('No Enquiry found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: { enquiry }
  });
});

exports.createEnquiry = catchAsync(async (req, res, next) => {
  const newEnquiry = await Enquiry.create(req.body);
  //Intern.findOne({_id:req.params.id})
  //console.log(req.body);
  res.status(201).json({
    status: 'Success',
    data: {
      Enquiry: newEnquiry
    }
  });
});

exports.updateEnquiry = catchAsync(async (req, res, next) => {
  const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
    //re validate for each update
  });
  if (!enquiry) {
    //console.log('hey');
    return next(new AppError('No Enquiry found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: {
      enquiry
    }
  });
});

exports.deleteEnquiry = catchAsync(async (req, res, next) => {
  const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
  if (!enquiry) {
    //console.log('hey');
    return next(new AppError('No Enquiry found with that ID', 404));
  }
  res.status(204).json({
    status: 'Success',
    data: {
      enquiry
    }
  });
});
