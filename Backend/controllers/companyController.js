const Company = require('./../models/companyModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllCompanies = catchAsync(async (req, res, next) => {
  //Execute Query
  const features = new APIFeatures(Company.find(), req.query)
    .filter()
    .sorter()
    .limitFields()
    .paginate();

  const company = await features.query;
  //Send Response
  res.status(200).json({
    status: 'Success',
    results: company.length,
    data: { company }
  });
});

exports.getCompanyById = catchAsync(async (req, res, next) => {
  const company = await Company.findById(req.params.id);
  //console.log(company);
  if (!company) {
    //console.log('hey');
    return next(new AppError('No Company found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: { company }
  });
});

exports.getCompanyByIdUser = catchAsync(async (req, res, next) => {
  const company = await Company.find({ user: req.params.id });
  console.log(company);
  if (!company) {
    //console.log('hey');
    return next(new AppError('No Company found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: { company }
  });
});

exports.createCompany = catchAsync(async (req, res, next) => {
  const newCompany = await Company.create(req.body);
  //Intern.findOne({_id:req.params.id})
  //console.log(req.body);
  res.status(201).json({
    status: 'Success',
    data: {
      Company: newCompany
    }
  });
});

exports.updateCompany = catchAsync(async (req, res, next) => {
  const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
    //re validate for each update
  });
  if (!company) {
    //console.log('hey');
    return next(new AppError('No Company found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: {
      company
    }
  });
});

exports.deleteCompany = catchAsync(async (req, res, next) => {
  const company = await Company.findByIdAndDelete(req.params.id);
  if (!company) {
    //console.log('hey');
    return next(new AppError('No Company found with that ID', 404));
  }
  res.status(204).json({
    status: 'Success',
    data: {
      company
    }
  });
});
